export interface ComponentTemplate {
  id: string;
  type: string;
  name: string;
  category: string;
  template: string;
}

export const componentTemplates: ComponentTemplate[] = [
  // Basic Components
  {
    id: '1',
    type: 'button',
    name: "Button",
    category: "Basic",
    template: '<Button variant="default">Click me</Button>'
  },
  {
    id: '2',
    type: 'input',
    name: "Input",
    category: "Basic",
    template: '<Input type="text" placeholder="Enter text..." />'
  },
  {
    id: '3',
    type: 'checkbox',
    name: "Checkbox",
    category: "Basic",
    template: '<Checkbox id="terms" /><label htmlFor="terms">I agree to the terms</label>'
  },
  {
    id: '4',
    type: 'radio',
    name: "Radio",
    category: "Basic",
    template: '<RadioGroup><Radio value="option1" label="Option 1" /><Radio value="option2" label="Option 2" /></RadioGroup>'
  },
  {
    id: '5',
    type: 'select',
    name: "Select",
    category: "Basic",
    template: '<Select><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger><SelectContent><SelectItem value="option1">Option 1</SelectItem><SelectItem value="option2">Option 2</SelectItem></SelectContent></Select>'
  },

  // Layout Components
  {
    id: '6',
    type: 'card',
    name: "Card",
    category: "Layout",
    template: '<Card><CardHeader><CardTitle>Card Title</CardTitle><CardDescription>Card Description</CardDescription></CardHeader><CardContent>Card Content</CardContent><CardFooter>Card Footer</CardFooter></Card>'
  },
  {
    id: '7',
    type: 'accordion',
    name: "Accordion",
    category: "Layout",
    template: '<Accordion type="single" collapsible><AccordionItem value="item-1"><AccordionTrigger>Is it accessible?</AccordionTrigger><AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent></AccordionItem></Accordion>'
  },
  {
    id: '8',
    type: 'tabs',
    name: "Tabs",
    category: "Layout",
    template: '<Tabs defaultValue="tab1"><TabsList><TabsTrigger value="tab1">Tab 1</TabsTrigger><TabsTrigger value="tab2">Tab 2</TabsTrigger></TabsList><TabsContent value="tab1">Tab 1 Content</TabsContent><TabsContent value="tab2">Tab 2 Content</TabsContent></Tabs>'
  },

  // Navigation Components
  {
    id: '9',
    type: 'navbar',
    name: "Navbar",
    category: "Navigation",
    template: '<nav className="bg-gray-800 p-4"><ul className="flex space-x-4"><li><a href="#" className="text-white">Home</a></li><li><a href="#" className="text-white">About</a></li><li><a href="#" className="text-white">Contact</a></li></ul></nav>'
  },
  {
    id: '10',
    type: 'breadcrumb',
    name: "Breadcrumb",
    category: "Navigation",
    template: '<Breadcrumb><BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbItem><BreadcrumbLink href="#">Category</BreadcrumbLink></BreadcrumbItem><BreadcrumbItem isCurrentPage><BreadcrumbLink href="#">Current Page</BreadcrumbLink></BreadcrumbItem></Breadcrumb>'
  },

  // Data Display Components
  {
    id: '11',
    type: 'table',
    name: "Table",
    category: "Data Display",
    template: '<Table><TableCaption>A list of your recent invoices.</TableCaption><TableHeader><TableRow><TableHead className="w-[100px]">Invoice</TableHead><TableHead>Status</TableHead><TableHead>Method</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell className="font-medium">INV001</TableCell><TableCell>Paid</TableCell><TableCell>Credit Card</TableCell><TableCell className="text-right">$250.00</TableCell></TableRow></TableBody></Table>'
  },
  {
    id: '12',
    type: 'avatar',
    name: "Avatar",
    category: "Data Display",
    template: '<Avatar><AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /><AvatarFallback>CN</AvatarFallback></Avatar>'
  },

  // Feedback Components
  {
    id: '13',
    type: 'alert',
    name: "Alert",
    category: "Feedback",
    template: '<Alert><AlertTitle>Heads up!</AlertTitle><AlertDescription>You can add components to your app using the cli.</AlertDescription></Alert>'
  },
  {
    id: '14',
    type: 'progress',
    name: "Progress",
    category: "Feedback",
    template: '<Progress value={33} />'
  },
  {
    id: '15',
    type: 'toast',
    name: "Toast",
    category: "Feedback",
    template: '<Toast><ToastTitle>Scheduled: Catch up</ToastTitle><ToastDescription>Friday, February 10, 2023 at 5:57 PM</ToastDescription></Toast>'
  },

  // Overlay Components
  {
    id: '16',
    type: 'dialog',
    name: "Dialog",
    category: "Overlay",
    template: '<Dialog><DialogTrigger>Open</DialogTrigger><DialogContent><DialogHeader><DialogTitle>Are you absolutely sure?</DialogTitle><DialogDescription>This action cannot be undone.</DialogDescription></DialogHeader></DialogContent></Dialog>'
  },
  {
    id: '17',
    type: 'popover',
    name: "Popover",
    category: "Overlay",
    template: '<Popover><PopoverTrigger>Open</PopoverTrigger><PopoverContent>Place content for the popover here.</PopoverContent></Popover>'
  },

  // Form Components
  {
    id: '18',
    type: 'form',
    name: "Form",
    category: "Form",
    template: '<form onSubmit={handleSubmit}><div><label htmlFor="username">Username:</label><Input type="text" id="username" name="username" required /></div><div><label htmlFor="password">Password:</label><Input type="password" id="password" name="password" required /></div><Button type="submit">Submit</Button></form>'
  },
  {
    id: '19',
    type: 'slider',
    name: "Slider",
    category: "Form",
    template: '<Slider defaultValue={[33]} max={100} step={1} />'
  },

  // Typography Components
  {
    id: '20',
    type: 'heading',
    name: "Heading",
    category: "Typography",
    template: '<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Heading</h1>'
  },
  {
    id: '21',
    type: 'paragraph',
    name: "Paragraph",
    category: "Typography",
    template: '<p className="leading-7 [&:not(:first-child)]:mt-6">This is a paragraph of text.</p>'
  },

  // Miscellaneous Components
  {
    id: '22',
    type: 'separator',
    name: "Separator",
    category: "Miscellaneous",
    template: '<Separator />'
  },
  {
    id: '23',
    type: 'badge',
    name: "Badge",
    category: "Miscellaneous",
    template: '<Badge variant="outline">Badge</Badge>'
  },
  {
    id: '24',
    type: 'aspectratio',
    name: "AspectRatio",
    category: "Layout",
    template: '<AspectRatio ratio={16 / 9}><img src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80" alt="Image" className="rounded-md object-cover" /></AspectRatio>'
  },
  {
    id: '25',
    type: 'calendar',
    name: "Calendar",
    category: "Data Display",
    template: '<Calendar mode="single" selected={new Date()} className="rounded-md border" />'
  },
  {
    id: '26',
    type: 'carousel',
    name: "Carousel",
    category: "Data Display",
    template: '<Carousel><CarouselContent><CarouselItem>1</CarouselItem><CarouselItem>2</CarouselItem><CarouselItem>3</CarouselItem></CarouselContent><CarouselPrevious /><CarouselNext /></Carousel>'
  },
  {
    id: '27',
    type: 'collapsible',
    name: "Collapsible",
    category: "Layout",
    template: '<Collapsible><CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger><CollapsibleContent>Yes. Free to use for personal and commercial projects. No attribution required.</CollapsibleContent></Collapsible>'
  },
  {
    id: '28',
    type: 'command',
    name: "Command",
    category: "Navigation",
    template: '<Command><CommandInput placeholder="Type a command or search..." /><CommandList><CommandEmpty>No results found.</CommandEmpty><CommandGroup heading="Suggestions"><CommandItem>Calendar</CommandItem><CommandItem>Search Emoji</CommandItem><CommandItem>Calculator</CommandItem></CommandGroup></CommandList></Command>'
  },
  {
    id: '29',
    type: 'contextmenu',
    name: "ContextMenu",
    category: "Navigation",
    template: '<ContextMenu><ContextMenuTrigger>Right click</ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Profile</ContextMenuItem><ContextMenuItem>Billing</ContextMenuItem><ContextMenuItem>Team</ContextMenuItem><ContextMenuItem>Subscription</ContextMenuItem></ContextMenuContent></ContextMenu>'
  },
  {
    id: '30',
    type: 'hovercard',
    name: "HoverCard",
    category: "Data Display",
    template: '<HoverCard><HoverCardTrigger>Hover</HoverCardTrigger><HoverCardContent>The React Framework – created and maintained by @vercel.</HoverCardContent></HoverCard>'
  },
  {
    id: '31',
    type: 'menubar',
    name: "Menubar",
    category: "Navigation",
    template: '<Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>New Tab</MenubarItem><MenubarItem>New Window</MenubarItem><MenubarSeparator /><MenubarItem>Share</MenubarItem><MenubarSeparator /><MenubarItem>Print</MenubarItem></MenubarContent></MenubarMenu></Menubar>'
  },
  {
    id: '32',
    type: 'navigationmenu',
    name: "NavigationMenu",
    category: "Navigation",
    template: '<NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>Item One</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink>Link</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem></NavigationMenuList></NavigationMenu>'
  },
  {
    id: '33',
    type: 'pagination',
    name: "Pagination",
    category: "Navigation",
    template: '<Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#" /></PaginationItem><PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem><PaginationItem><PaginationEllipsis /></PaginationItem><PaginationItem><PaginationNext href="#" /></PaginationItem></PaginationContent></Pagination>'
  },
  {
    id: '34',
    type: 'resizablepanel',
    name: "ResizablePanel",
    category: "Layout",
    template: '<ResizablePanelGroup direction="horizontal"><ResizablePanel>One</ResizablePanel><ResizableHandle /><ResizablePanel>Two</ResizablePanel></ResizablePanelGroup>'
  },
  {
    id: '35',
    type: 'scrollarea',
    name: "ScrollArea",
    category: "Layout",
    template: '<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4"><div>Long content here...</div></ScrollArea>'
  },
  {
    id: '36',
    type: 'sonner',
    name: "Sonner",
    category: "Feedback",
    template: '<Button onClick={() => toast("Event has been created")}>Create event</Button>'
  },
  {
    id: '37',
    type: 'componentbuilder',
    name: "ComponentBuilder",
    category: "Meta",
    template: '<ComponentBuilder><ComponentInput placeholder="Enter component name" /><PropsEditor /><ChildrenEditor /><StyleEditor /><PreviewPane /></ComponentBuilder>'
  },
  {
    id: '38',
    type: 'propseditor',
    name: "PropsEditor",
    category: "Meta",
    template: '<PropsEditor><PropInput name="propName" type="text" /><PropInput name="propType" type="select" options={["string", "number", "boolean"]} /><AddPropButton>Add Prop</AddPropButton></PropsEditor>'
  },
  {
    id: '39',
    type: 'childreneditor',
    name: "ChildrenEditor",
    category: "Meta",
    template: '<ChildrenEditor><ChildList><ChildItem>Child 1</ChildItem><ChildItem>Child 2</ChildItem></ChildList><AddChildButton>Add Child</AddChildButton></ChildrenEditor>'
  },
  {
    id: '40',
    type: 'styleeditor',
    name: "StyleEditor",
    category: "Meta",
    template: '<StyleEditor><StyleInput property="color" type="color" /><StyleInput property="fontSize" type="number" /><StyleInput property="fontWeight" type="select" options={["normal", "bold"]} /></StyleEditor>'
  },
  {
    id: '41',
    type: 'previewpane',
    name: "PreviewPane",
    category: "Meta",
    template: '<PreviewPane><ComponentPreview /><CodePreview language="jsx" /></PreviewPane>'
  },
  {
    id: '42',
    type: 'drawer',
    name: "Drawer",
    category: "Overlay",
    template: '<Drawer><DrawerTrigger>Open</DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>Are you absolutely sure?</DrawerTitle><DrawerDescription>This action cannot be undone.</DrawerDescription></DrawerHeader><DrawerFooter><Button>Submit</Button><DrawerClose>Cancel</DrawerClose></DrawerFooter></DrawerContent></Drawer>'
  },
  {
    id: '43',
    type: 'dropdownmenu',
    name: "DropdownMenu",
    category: "Navigation",
    template: '<DropdownMenu><DropdownMenuTrigger>Open</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>My Account</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem>Profile</DropdownMenuItem><DropdownMenuItem>Billing</DropdownMenuItem><DropdownMenuItem>Team</DropdownMenuItem><DropdownMenuItem>Subscription</DropdownMenuItem></DropdownMenuContent></DropdownMenu>'
  },
  {
    id: '44',
    type: 'radiogroup',
    name: "RadioGroup",
    category: "Data Entry",
    template: '<RadioGroup defaultValue="option-one"><RadioGroupItem value="option-one" id="option-one" /><Label htmlFor="option-one">Option One</Label></RadioGroup>'
  },
  {
    id: '45',
    type: 'select',
    name: "Select",
    category: "Data Entry",
    template: '<Select><SelectTrigger><SelectValue placeholder="Select a fruit" /></SelectTrigger><SelectContent><SelectItem value="apple">Apple</SelectItem><SelectItem value="banana">Banana</SelectItem><SelectItem value="blueberry">Blueberry</SelectItem></SelectContent></Select>'
  },
  {
    id: '46',
    type: 'sheet',
    name: "Sheet",
    category: "Overlay",
    template: '<Sheet><SheetTrigger>Open</SheetTrigger><SheetContent><SheetHeader><SheetTitle>Are you sure you want to delete this?</SheetTitle><SheetDescription>This action cannot be undone.</SheetDescription></SheetHeader></SheetContent></Sheet>'
  },
  {
    id: '47',
    type: 'skeleton',
    name: "Skeleton",
    category: "Feedback",
    template: '<Skeleton className="w-[100px] h-[20px] rounded-full" />'
  },
  {
    id: '48',
    type: 'switch',
    name: "Switch",
    category: "Data Entry",
    template: '<Switch />'
  },
  {
    id: '49',
    type: 'textarea',
    name: "Textarea",
    category: "Data Entry",
    template: '<Textarea placeholder="Type your message here." />'
  },
  {
    id: '50',
    type: 'toggle',
    name: "Toggle",
    category: "Data Entry",
    template: '<Toggle>Toggle</Toggle>'
  },
  {
    id: '51',
    type: 'tooltip',
    name: "Tooltip",
    category: "Overlay",
    template: '<Tooltip><TooltipTrigger>Hover</TooltipTrigger><TooltipContent><p>Add to library</p></TooltipContent></Tooltip>'
  },
  {
    id: '52',
    type: 'apiconnector',
    name: "APIConnector",
    category: "Integration",
    template: '<APIConnector endpoint="https://api.example.com/data" method="GET" />'
  },
  {
    id: '53',
    type: 'restfulclient',
    name: "RESTfulClient",
    category: "Integration",
    template: '<RESTfulClient baseURL="https://api.example.com" endpoints={["users", "posts", "comments"]} />'
  },
  {
    id: '54',
    type: 'graphqlquery',
    name: "GraphQLQuery",
    category: "Integration",
    template: '<GraphQLQuery query={`{ users { id name email } }`} />'
  },
  {
    id: '55',
    type: 'websocketconnection',
    name: "WebSocketConnection",
    category: "Integration",
    template: '<WebSocketConnection url="wss://websocket.example.com" />'
  },
  {
    id: '56',
    type: 'oauthintegration',
    name: "OAuthIntegration",
    category: "Integration",
    template: '<OAuthIntegration provider="google" clientId="YOUR_CLIENT_ID" />'
  },
  {
    id: '57',
    type: 'apikeyauth',
    name: "APIKeyAuth",
    category: "Integration",
    template: '<APIKeyAuth apiKey="YOUR_API_KEY" headerName="X-API-Key" />'
  },
  {
    id: '58',
    type: 'jwtauthenticator',
    name: "JWTAuthenticator",
    category: "Integration",
    template: '<JWTAuthenticator token="YOUR_JWT_TOKEN" />'
  },
  {
    id: '59',
    type: 'datafetcher',
    name: "DataFetcher",
    category: "Integration",
    template: '<DataFetcher url="https://api.example.com/data" interval={5000} />'
  },
  {
    id: '60',
    type: 'apierrorhandler',
    name: "APIErrorHandler",
    category: "Integration",
    template: '<APIErrorHandler onError={(error) => console.error(error)} />'
  },
  {
    id: '61',
    type: 'responseformatter',
    name: "ResponseFormatter",
    category: "Integration",
    template: '<ResponseFormatter format="json" />'
  },
  {
    id: '62',
    type: 'apiratelimiter',
    name: "APIRateLimiter",
    category: "Integration",
    template: '<APIRateLimiter maxRequests={100} perInterval="minute" />'
  },
  {
    id: '63',
    type: 'corsproxy',
    name: "CORSProxy",
    category: "Integration",
    template: '<CORSProxy url="https://cors-anywhere.herokuapp.com/" />'
  },
  {
    id: '64',
    type: 'apiversioning',
    name: "APIVersioning",
    category: "Integration",
    template: '<APIVersioning version="v1" />'
  },
  {
    id: '65',
    type: 'webhooklistener',
    name: "WebhookListener",
    category: "Integration",
    template: '<WebhookListener endpoint="/api/webhook" secret="YOUR_WEBHOOK_SECRET" />'
  },
  {
    id: '66',
    type: 'apicache',
    name: "APICache",
    category: "Integration",
    template: '<APICache ttl={3600} maxSize={100} />'
  }
  ,
  {
    id: '67',
    type: 'graphqlclient',
    name: "GraphQLClient",
    category: "Integration",
    template: '<GraphQLClient endpoint="https://api.example.com/graphql" />'
  },
  {
    id: '68',
    type: 'oauth2client',
    name: "OAuth2Client",
    category: "Integration",
    template: '<OAuth2Client clientId="YOUR_CLIENT_ID" clientSecret="YOUR_CLIENT_SECRET" />'
  },
  {
    id: '69',
    type: 'websocketconnection',
    name: "WebSocketConnection",
    category: "Integration",
    template: '<WebSocketConnection url="wss://api.example.com/ws" />'
  },
  {
    id: '70',
    type: 'apilogger',
    name: "APILogger",
    category: "Integration",
    template: '<APILogger level="info" />'
  },
  {
    id: '71',
    type: 'datatransformer',
    name: "DataTransformer",
    category: "Integration",
    template: '<DataTransformer transform={(data) => ({ ...data, transformed: true })} />'
  },
  {
    id: '72',
    type: 'apiretry',
    name: "APIRetry",
    category: "Integration",
    template: '<APIRetry maxAttempts={3} delay={1000} />'
  },
  {
    id: '73',
    type: 'sseclient',
    name: "SSEClient",
    category: "Integration",
    template: '<SSEClient url="https://api.example.com/events" />'
  },
  {
    id: '74',
    type: 'apiloadbalancer',
    name: "APILoadBalancer",
    category: "Integration",
    template: '<APILoadBalancer endpoints={["https://api1.example.com", "https://api2.example.com"]} />'
  },
  {
    id: '75',
    type: 'datavalidator',
    name: "DataValidator",
    category: "Integration",
    template: '<DataValidator schema={yourValidationSchema} />'
  },
  {
    id: '76',
    type: 'apimetrics',
    name: "APIMetrics",
    category: "Integration",
    template: '<APIMetrics collectLatency={true} collectStatusCodes={true} />'
  },
  {
    id: '77',
    type: 'dataencryptor',
    name: "DataEncryptor",
    category: "Integration",
    template: '<DataEncryptor algorithm="AES" key="YOUR_ENCRYPTION_KEY" />'
  },
  {
    id: '78',
    type: 'apipagination',
    name: "APIPagination",
    category: "Integration",
    template: '<APIPagination itemsPerPage={20} />'
  },
  {
    id: '79',
    type: 'datacompressor',
    name: "DataCompressor",
    category: "Integration",
    template: '<DataCompressor algorithm="gzip" />'
  },
  {
    id: '80',
    type: 'apicircuitbreaker',
    name: "APICircuitBreaker",
    category: "Integration",
    template: '<APICircuitBreaker failureThreshold={5} resetTimeout={30000} />'
  },
  {
    id: '81',
    type: 'datasynchronizer',
    name: "DataSynchronizer",
    category: "Integration",
    template: '<DataSynchronizer localStore={localStore} remoteAPI={remoteAPI} />'
  },
  {
    id: '82',
    type: 'apidocumentation',
    name: "APIDocumentation",
    category: "Integration",
    template: '<APIDocumentation swaggerUrl="https://api.example.com/swagger.json" />'
  },
  {
    id: '83',
    type: 'datamigrator',
    name: "DataMigrator",
    category: "Integration",
    template: '<DataMigrator version="1.0" migrations={migrationScripts} />'
  },
  {
    id: '84',
    type: 'apimock',
    name: "APIMock",
    category: "Integration",
    template: '<APIMock responses={mockResponses} />'
  },
  {
    id: '85',
    type: 'databackup',
    name: "DataBackup",
    category: "Integration",
    template: '<DataBackup schedule="0 0 * * *" destination="s3://your-bucket/backups/" />'
  },
  {
    id: '86',
    type: 'apianalytics',
    name: "APIAnalytics",
    category: "Integration",
    template: '<APIAnalytics trackingId="UA-XXXXX-Y" />'
  }
  ,
  {
    id: '87',
    type: 'freightquote',
    name: "FreightQuote",
    category: "Integration",
    template: '<FreightQuote apiKey="YOUR_7L_API_KEY" />'
  },
  {
    id: '88',
    type: 'shipmenttracking',
    name: "ShipmentTracking",
    category: "Integration",
    template: '<ShipmentTracking apiKey="YOUR_7L_API_KEY" trackingNumber="TRACKING_NUMBER" />'
  },
  {
    id: '89',
    type: 'carrierlookup',
    name: "CarrierLookup",
    category: "Integration",
    template: '<CarrierLookup apiKey="YOUR_7L_API_KEY" />'
  },
  {
    id: '90',
    type: 'ratecomparison',
    name: "RateComparison",
    category: "Integration",
    template: '<RateComparison apiKey="YOUR_7L_API_KEY" origin="ORIGIN_ZIP" destination="DESTINATION_ZIP" weight={100} />'
  },
  {
    id: '91',
    type: 'documentretrieval',
    name: "DocumentRetrieval",
    category: "Integration",
    template: '<DocumentRetrieval apiKey="YOUR_7L_API_KEY" shipmentId="SHIPMENT_ID" />'
  },
  {
    id: '92',
    type: 'capacityfinder',
    name: "CapacityFinder",
    category: "Integration",
    template: '<CapacityFinder apiKey="YOUR_7L_API_KEY" origin="ORIGIN_ZIP" destination="DESTINATION_ZIP" />'
  }
  ,
  {
    id: '93',
    type: 'freightbooking',
    name: "FreightBooking",
    category: "Integration",
    template: '<FreightBooking apiKey="YOUR_7L_API_KEY" origin="ORIGIN_ZIP" destination="DESTINATION_ZIP" weight={1000} />'
  },
  {
    id: '94',
    type: 'customsclearance',
    name: "CustomsClearance",
    category: "Integration",
    template: '<CustomsClearance apiKey="YOUR_7L_API_KEY" shipmentId="SHIPMENT_ID" />'
  },
  {
    id: '95',
    type: 'insurancecoverage',
    name: "InsuranceCoverage",
    category: "Integration",
    template: '<InsuranceCoverage apiKey="YOUR_7L_API_KEY" shipmentValue={10000} />'
  },
  {
    id: '96',
    type: 'warehousemanagement',
    name: "WarehouseManagement",
    category: "Integration",
    template: '<WarehouseManagement apiKey="YOUR_7L_API_KEY" warehouseId="WAREHOUSE_ID" />'
  },
  {
    id: '97',
    type: 'freightaudit',
    name: "FreightAudit",
    category: "Integration",
    template: '<FreightAudit apiKey="YOUR_7L_API_KEY" invoiceId="INVOICE_ID" />'
  },
  {
    id: '98',
    type: 'supplychainvisibility',
    name: "SupplyChainVisibility",
    category: "Integration",
    template: '<SupplyChainVisibility apiKey="YOUR_7L_API_KEY" orderId="ORDER_ID" />'
  },
  {
    id: '99',
    type: 'sustainabilitymetrics',
    name: "SustainabilityMetrics",
    category: "Integration",
    template: '<SustainabilityMetrics apiKey="YOUR_7L_API_KEY" shipmentId="SHIPMENT_ID" />'
  }
];
