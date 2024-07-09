import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ComponentTemplate as ComponentTemplateType } from '../lib/componentTemplates';
import { LegoBuilder } from './lego/LegoBuilder';
import { LegoContainer } from './lego/LegoContainer';
import { LegoMat } from './lego/LegoMat';
import { LegoToGo } from './lego/LegoToGo';
import { LegoBlockItem } from './lego/types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface APIComponentBuilderProps {
  apiEndpoint: string;
  apiKey: string;
  onComponentCreated: (component: ComponentTemplateType) => void;
}

interface ComponentTemplate {
  id: string;
  name: string;
  type: string;
  category: string;
  template: string;
}

export const APIComponentBuilder: React.FC<APIComponentBuilderProps> = ({
  apiEndpoint,
  apiKey,
  onComponentCreated,
}) => {
  const [apiSchema, setAPISchema] = useState<any>(null);
  const [componentName, setComponentName] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [parameters, setParameters] = useState<Record<string, string>>({});
  const [responseMapping, setResponseMapping] = useState<
    Record<string, string>
  >({});
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);

  const fetchAPISchema = useCallback(async () => {
    try {
      const response = await fetch(`${apiEndpoint}/openapi.json`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const schema = await response.json();
      setAPISchema(schema);
    } catch (error) {
      console.error('Error fetching API schema:', error);
    }
  }, [apiEndpoint, apiKey]);

  useEffect(() => {
    fetchAPISchema();
  }, [fetchAPISchema]);

  const handleDrop = useCallback((item: LegoBlockItem) => {
    setBlocks((prevBlocks) => [...prevBlocks, item]);
  }, []);

  const generateComponent = useCallback(() => {
    if (!apiSchema || !selectedEndpoint) return;

    const endpoint = apiSchema.paths[selectedEndpoint];
    const method = Object.keys(endpoint)[0];
    const operation = endpoint[method];

    const parameterInputs = Object.entries(parameters)
      .map(
        ([key, value]) =>
          `<input name="${key}" value="${value}" onChange={(e) => setParams({...params, ${key}: e.target.value})} />`,
      )
      .join('\n');

    const responseMappingCode = Object.entries(responseMapping)
      .map(([key, value]) => `const ${key} = data?.${value};`)
      .join('\n');

    const componentTemplate: ComponentTemplateType = {
      id: uuidv4(),
      name:
        componentName ||
        `API${method.toUpperCase()}${selectedEndpoint.replace(/\//g, '')}`,
      type: 'api',
      category: 'API Integration',
      template: `
        const [params, setParams] = useState(${JSON.stringify(parameters)});
        <APIConnector
          endpoint={\`${apiEndpoint}${selectedEndpoint}\${new URLSearchParams(params)}\`}
          method="${method.toUpperCase()}"
          apiKey="${apiKey}"
        >
          {(data, loading, error) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            ${responseMappingCode}
            return (
              <div>
                ${parameterInputs}
                <pre>{JSON.stringify({ ${Object.keys(responseMapping).join(
                  ', ',
                )} }, null, 2)}</pre>
              </div>
            );
          }}
        </APIConnector>
      `,
    };

    onComponentCreated(componentTemplate);
  }, [
    apiSchema,
    selectedEndpoint,
    componentName,
    parameters,
    responseMapping,
    apiEndpoint,
    apiKey,
    onComponentCreated,
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="api-component-builder">
        <h2>API Component Builder</h2>
        <input
          type="text"
          placeholder="Component Name"
          value={componentName}
          onChange={(e) => setComponentName(e.target.value)}
        />
        <select
          value={selectedEndpoint}
          onChange={(e) => setSelectedEndpoint(e.target.value)}
          aria-label="Select API endpoint"
        >
          <option value="">Select an endpoint</option>
          {apiSchema &&
            Object.keys(apiSchema.paths).map((path) => (
              <option key={path} value={path}>
                {path}
              </option>
            ))}
        </select>
        <h3>Parameters</h3>
        {apiSchema &&
          selectedEndpoint &&
          apiSchema.paths[selectedEndpoint][
            Object.keys(apiSchema.paths[selectedEndpoint])[0]
          ].parameters.map((param: any) => (
            <input
              key={param.name}
              type="text"
              placeholder={param.name}
              value={parameters[param.name] || ''}
              onChange={(e) =>
                setParameters({ ...parameters, [param.name]: e.target.value })
              }
            />
          ))}
        <h3>Response Mapping</h3>
        <input
          type="text"
          placeholder="Response field"
          value={Object.keys(responseMapping)[0] || ''}
          onChange={(e) =>
            setResponseMapping({
              [e.target.value]: Object.values(responseMapping)[0] || '',
            })
          }
        />
        <input
          type="text"
          placeholder="Component property"
          value={Object.values(responseMapping)[0] || ''}
          onChange={(e) =>
            setResponseMapping({
              [Object.keys(responseMapping)[0] || '']: e.target.value,
            })
          }
        />
        <button onClick={generateComponent}>Generate Component</button>

        <LegoBuilder
          apiEndpoint={apiEndpoint}
          apiKey={apiKey}
          components={[]}
          onDrop={handleDrop}
        />

        <LegoToGo onExport={(exportedBlocks) => console.log(exportedBlocks)} />
      </div>
    </DndProvider>
  );
};
