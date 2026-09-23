export interface Project {
  id: string
  title: string
  subtitle: string
  category: 'distributed' | 'spatial' | 'fullstack' | 'devops'
  categoryLabel: string
  period: string
  role: string
  organization?: string
  status: 'In Production' | 'Active Engine' | 'Live Platform' | 'Shipped'
  summary: string
  metrics: { label: string; value: string }[]
  tags: string[]
  problem: string
  solution: string
  architectureHighlights: string[]
  codeSnippet?: {
    language: string
    title: string
    code: string
  }
}

export interface Experience {
  company: string
  role: string
  location: string
  period: string
  badge?: string
  description: string[]
  technologies: string[]
}

export interface SkillCategory {
  title: string
  description: string
  skills: { name: string; context: string; highlight?: boolean }[]
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Neal Parimoo',
    title: 'Systems & Full-Stack Software Engineer',
    education: {
      school: 'University of California, San Diego',
      degree: 'Bachelor of Science in Computer Engineering',
      years: '2020 – 2024',
      location: 'La Jolla, CA',
    },
    contact: {
      email: 'nparimoo13@gmail.com',
      phone: '949-532-7440',
      location: 'Costa Mesa / Irvine, CA (Open to Remote & On-site)',
      linkedin: 'https://www.linkedin.com/in/nparimoo',
      github: 'https://github.com/nparimoo', // or fallback
    },
    bio: 'Software Engineer specializing in high-concurrency C# .NET backends, real-time WebSocket infrastructure, and deterministic data systems. Currently engineering the EVOLV Platform at Zero Impact Energy, powering 1,000+ concurrent live EV chargers across 300+ stations. Background in Computer Engineering from UC San Diego with hands-on experience in cloud automation and geospatial AI.',
    status: 'Actively Interviewing for Full-Time Software Engineer Roles',
    coreMetrics: [
      {
        value: '1,000+',
        label: 'Concurrent WebSockets',
        subtext: 'Across 300+ live EV sites on .NET backend',
      },
      {
        value: '78%',
        label: 'Cloud Cost Cut',
        subtext: 'Dev DynamoDB spend reduced at First American',
      },
      {
        value: '-40%',
        label: 'Complexity Reduction',
        subtext: 'Lowered cyclomatic complexity while expanding test suite',
      },
      {
        value: 'UCSD \'24',
        label: 'B.S. Computer Engineering',
        subtext: 'Rigorous systems, networking & software foundations',
      },
    ],
  },

  projects: [
    {
      id: 'evolv-platform',
      title: 'EVOLV Platform & OCPP Telemetry Engine',
      subtitle: 'Real-Time IoT Fleet Management & Telemetry Core for 300+ Commercial EV Stations',
      category: 'distributed',
      categoryLabel: 'Distributed & IoT (.NET)',
      period: 'Sept 2024 – Present',
      role: 'C# .NET Backend Developer',
      organization: 'Zero Impact Energy',
      status: 'In Production',
      summary:
        'A mission-critical C# .NET Core platform managing bi-directional, stateful WebSocket communication for 1,000+ concurrent high-power DC fast chargers and AC pedestals across 300+ deployed customer sites.',
      metrics: [
        { label: 'Concurrent WebSockets', value: '1,000+' },
        { label: 'Live Deployed Sites', value: '300+' },
        { label: 'Complexity Cut', value: '40%' },
        { label: 'Protocols', value: 'OCPP 1.6-J / 2.0.1' },
      ],
      tags: ['C#', '.NET Core 8', 'WebSockets', 'OCPP 1.6-J', 'GraphQL', 'REST API', 'LINQ', 'xUnit', 'SQL Server'],
      problem:
        'Commercial EV chargers stream high-frequency meter values, status changes, and fault signals over stateful WebSockets. Unreliable network drops in the field frequently left chargers in orphaned states, while unoptimized query pipelines caused latency spikes during simultaneous charge session updates.',
      solution:
        'Built an asynchronous, resilient OCPP message ingestion pipeline with structured exception handlers, non-blocking dispatch, and automatic heartbeat monitoring. Designed an automated alert daemon that detects unresponsive chargers and triggers NOC dispatch emails. Refactored high-traffic LINQ queries and tightened API and GraphQL endpoints with strict JWT authentication.',
      architectureHighlights: [
        'Persistent bi-directional WebSocket gateway maintaining low-overhead keepalive frames with 1,000+ chargers',
        'Deterministic JSON-RPC OCPP 1.6-J & 2.0 parser covering BootNotification, MeterValues, StatusNotification, and Authorize frames',
        'Automated background watchdog daemon detecting heartbeat timeouts and dispatching instant alert notifications',
        'GraphQL and REST interfaces serving real-time station metrics to fleet operations dashboards with RBAC permissions',
        'Expanded comprehensive test harness across unit, integration, and system tiers with xUnit',
      ],
      codeSnippet: {
        language: 'csharp',
        title: 'OcppMessageDispatcher.cs (Architecture Snapshot)',
        code: `// Asynchronous OCPP 1.6-J message handler with resilient telemetry ingestion
public async Task<OcppResponse> HandleIncomingFrameAsync(
    string chargerId, 
    OcppFrame frame, 
    CancellationToken ct)
{
    _telemetryLogger.LogTrace("Ingesting {Action} from {ChargerId} [{MsgId}]", 
        frame.Action, chargerId, frame.MessageId);

    switch (frame.Action)
    {
        case OcppAction.MeterValues:
            var meterPayload = frame.Payload.Deserialize<MeterValuesPayload>();
            await _meterStreamService.ProcessPowerSampleAsync(chargerId, meterPayload, ct);
            await _heartbeatTracker.TouchStationAsync(chargerId, DateTime.UtcNow);
            return OcppResponse.Ok(frame.MessageId);

        case OcppAction.StatusNotification:
            var statusPayload = frame.Payload.Deserialize<StatusNotificationPayload>();
            await _stationStateService.UpdateConnectorStateAsync(chargerId, statusPayload, ct);
            return OcppResponse.Ok(frame.MessageId);

        case OcppAction.Heartbeat:
            await _heartbeatTracker.TouchStationAsync(chargerId, DateTime.UtcNow);
            return OcppResponse.Ok(frame.MessageId, new { currentTime = DateTime.UtcNow });

        default:
            _telemetryLogger.LogWarning("Unhandled OCPP action {Action} from {ChargerId}", frame.Action, chargerId);
            return OcppResponse.NotImplemented(frame.MessageId);
    }
}`,
      },
    },

    {
      id: 'terranomics',
      title: 'TerraNomics — Geospatial AI Siting Engine',
      subtitle: 'Deterministic Spatial Analysis Engine Turning Plain English into Verified Parcel Rankings',
      category: 'spatial',
      categoryLabel: 'Geospatial & Spatial AI (Python/PostGIS)',
      period: '2024',
      role: 'Systems & Spatial Engine Architect',
      status: 'Active Engine',
      summary:
        'An AI-orchestrated geospatial site selection engine that turns natural language siting criteria into structured, reviewable spatial analysis plans executed deterministically in PostGIS across demographic, competitor, road, and zoning datasets.',
      metrics: [
        { label: 'Evaluation Speed', value: '< 900ms' },
        { label: 'Auditable Logic', value: '100% Traceable' },
        { label: 'Parcels Evaluated', value: '10,000+ Hexes' },
        { label: 'Data Engine', value: 'PostGIS / Redis' },
      ],
      tags: ['Python', 'FastAPI', 'PostGIS', 'PostgreSQL', 'Redis', 'Docker', 'MapLibre', 'GeoJSON', 'OpenAI'],
      problem:
        'Traditional GIS site selection requires days of manual ArcGIS multi-layer joins, while naive LLM approaches generate confident hallucinations with non-existent addresses and fabricated spatial numbers.',
      solution:
        'Architected a two-phase architecture: an LLM planner parses prompts into a strictly validated, human-reviewable AnalysisPlan against a closed metric vocabulary. The plan is confirmed or edited before deterministic PostGIS spatial computing runs hexagonal candidate generation, area-weighted census apportionment, and KNN competitor proximity.',
      architectureHighlights: [
        'Strict separation between probabilistic planning (LLM tool-calling) and deterministic compute (PostGIS/SQL)',
        'Area-weighted demographic apportionment and geodesic buffers computed on PostGIS spatial indexes (GIST)',
        'Hexagonal spatial binning clipped to commercial zoning boundaries to prevent wasted evaluations',
        'Every final score exposes its raw sub-metric measurements and exact mathematical contribution',
        'Packaged with Docker Compose, FastAPI asynchronous worker queues, and Redis caching for sub-second repeat queries',
      ],
      codeSnippet: {
        language: 'python',
        title: 'spatial_ranker.py (Deterministic Scoring Engine)',
        code: `@router.post("/analysis/execute")
async def execute_spatial_analysis(
    plan: AnalysisPlan, 
    db: AsyncSession = Depends(get_db)
) -> SitingResult:
    # Deterministic spatial execution — zero LLM in the numerical loop
    query = text("""
        WITH candidate_hexes AS (
            SELECT h.hex_id, h.geom
            FROM hex_grid h
            WHERE ST_Intersects(h.geom, :study_area)
              AND h.commercial_zoning_pct >= :min_zoning
        ),
        competitor_proximity AS (
            SELECT c.hex_id,
                   COUNT(comp.id) as competitor_count,
                   MIN(ST_Distance(c.geom::geography, comp.geom::geography)) as nearest_competitor_m
            FROM candidate_hexes c
            LEFT JOIN competitors comp 
              ON ST_DWithin(c.geom::geography, comp.geom::geography, :buffer_radius_m)
            GROUP BY c.hex_id
        )
        SELECT c.hex_id, cp.nearest_competitor_m, cp.competitor_count,
               demo.pop_within_3mi, demo.median_income
        FROM candidate_hexes c
        JOIN competitor_proximity cp ON c.hex_id = cp.hex_id
        JOIN LATERAL get_demographics(c.geom) demo ON true;
    """)
    return await run_multi_criteria_scoring(db, query, plan.weights)`,
      },
    },

    {
      id: 'film-rec-league',
      title: 'FILM — Fantasy Intelligence League Monitor',
      subtitle: 'Data-Dense League Intelligence Terminal & Multi-Platform Roster Engine',
      category: 'fullstack',
      categoryLabel: 'Full-Stack Web (React/Next.js)',
      period: '2024 – 2025',
      role: 'Full-Stack Creator & Lead',
      status: 'Live Platform',
      summary:
        'A high-density fantasy football analytics terminal syncing live league data across Sleeper, ESPN, and Yahoo APIs, featuring a custom deterministic Player Value Score (PVS) algorithm and an automated trade analyzer.',
      metrics: [
        { label: 'Supported APIs', value: 'Sleeper / ESPN / Yahoo' },
        { label: 'Player Universe', value: '3,000+ NFL Athletes' },
        { label: 'Frontend Stack', value: 'React 19 / Next.js 16' },
        { label: 'Design System', value: 'Terminal / Phosphor' },
      ],
      tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Prisma', 'SQLite/Postgres', 'Recharts', 'Vitest'],
      problem:
        'Fantasy team managers navigate sluggish, ad-saturated commercial apps with generic advice that ignores league-specific roster settings, positional scarcity, and playoff schedules.',
      solution:
        'Built a keyboard-accessible, Bloomberg-inspired dark terminal web application. Implemented a typed multi-provider ingestion layer caching player stats and roster states into Prisma. Developed a deterministic Player Value Score (PVS) algorithm paired with an AI-powered trade analyzer that simulates post-trade team power deltas.',
      architectureHighlights: [
        'Next.js 16 App Router with React Server Components (RSC) reading Prisma for near-instant cold loads',
        'Typed multi-platform adapter pattern unifying fragmented schemas from Sleeper, ESPN, and Yahoo',
        'Custom Player Value Score algorithm accounting for target shares, red-zone touches, and replacement baseline',
        'Trade analyzer running Monte Carlo simulation of weekly scoring distribution deltas',
        'Near-black terminal design system using phosphor lime highlights, Radix primitives, and Recharts radar profiles',
      ],
      codeSnippet: {
        language: 'typescript',
        title: 'playerValueScorer.ts (Positional Scarcity Algorithm)',
        code: `export function calculatePlayerValueScore(
  player: PlayerTelemetry,
  scoringFormat: ScoringFormat,
  replacementLevel: Map<Position, number>
): PlayerValueScore {
  const projectedWeekly = computeExpectedPoints(player.stats, scoringFormat);
  const baseline = replacementLevel.get(player.position) ?? 0;
  
  // Value Above Replacement (VAR) adjusted for positional scarcity multiplier
  const valueAboveReplacement = Math.max(0, projectedWeekly - baseline);
  const scarcityMultiplier = POSITIONAL_SCARCITY_WEIGHTS[player.position];
  
  const rawScore = (projectedWeekly * 0.4) + (valueAboveReplacement * 0.6 * scarcityMultiplier);
  const normalizedPVS = Math.min(100, Math.round((rawScore / MAX_THEORETICAL_POINTS) * 100));

  return {
    pvs: normalizedPVS,
    varScore: Number(valueAboveReplacement.toFixed(2)),
    scarcityTier: getScarcityTier(player.position, normalizedPVS),
    metrics: { projectedWeekly, baseline, volatilityIndex: player.variance }
  };
}`,
      },
    },

    {
      id: 'helpsphere',
      title: 'HelpSphere — Smart-Triage Incident Platform',
      subtitle: 'Enterprise Full-Stack Support System with Rule-Based Incident Routing',
      category: 'distributed',
      categoryLabel: 'Distributed & IoT (.NET)',
      period: '2023 – 2024',
      role: 'Full-Stack Developer',
      status: 'Shipped',
      summary:
        'A full-stack support ticketing and issue triage platform built with ASP.NET Core Web API, React, Entity Framework Core, and AWS cloud storage, featuring an automated triage classifier.',
      metrics: [
        { label: 'Backend', value: 'ASP.NET Core Web API' },
        { label: 'Storage', value: 'AWS RDS & S3' },
        { label: 'Security', value: 'JWT / RBAC' },
        { label: 'Triage Efficiency', value: 'Automated Routing' },
      ],
      tags: ['C#', '.NET Web API', 'React', 'Entity Framework Core', 'AWS RDS', 'AWS S3', 'PostgreSQL', 'JWT'],
      problem:
        'Support tickets in mid-size organizations often sit in unassigned queues for hours due to manual triage, causing delayed first-response times and missed SLA thresholds.',
      solution:
        'Constructed a full-stack ticketing platform backed by a rule-based smart-triage engine that analyzes incoming issue titles, error logs, and component tags to classify severity and route tickets to responsible engineering pods.',
      architectureHighlights: [
        'RESTful ASP.NET Core Web API following clean architecture repository patterns',
        'Entity Framework Core with optimistic concurrency control for concurrent ticket updates',
        'Secure pre-signed AWS S3 URL generation for diagnostic log uploads and attachments',
        'Role-based authorization (RBAC) enforcing user, technician, and administrator boundaries',
      ],
    },

    {
      id: 'devops-automation',
      title: 'Cloud Cost Optimization & CI/CD Pipelines',
      subtitle: 'Automated Infrastructure Audits Slashing Developer DynamoDB Spend by 78%',
      category: 'devops',
      categoryLabel: 'Cloud & DevOps (Azure/AWS)',
      period: 'June – Sept 2022',
      role: 'Azure DevOps Intern',
      organization: 'First American',
      status: 'Shipped',
      summary:
        'Automated CI/CD workflows and cost optimization scripts in Azure Pipelines that monitored AWS cloud resources across 100+ developers, cutting non-production DynamoDB expenses by 78%.',
      metrics: [
        { label: 'DynamoDB Cost Cut', value: '78%' },
        { label: 'Engineers Supported', value: '100+' },
        { label: 'Pipeline Engine', value: 'Azure DevOps' },
        { label: 'Target Cloud', value: 'AWS DynamoDB & Lambda' },
      ],
      tags: ['Azure Pipelines', 'YAML', 'AWS DynamoDB', 'AWS Lambda', 'Git', 'Cloud Cost Ops', 'PowerShell/Bash'],
      problem:
        'Developer sandbox environments suffered from orphaned high-throughput DynamoDB tables and stale AWS Lambda artifacts running indefinitely, driving up unnecessary monthly infrastructure bills.',
      solution:
        'Developed scheduled YAML pipeline jobs in Azure DevOps that audited AWS account resources weekly, identifying idle DynamoDB tables, downsizing unneeded provisioned capacity units (RCU/WCU), and configuring automatic TTL rules.',
      architectureHighlights: [
        'Weekly automated Azure Pipeline YAML task orchestrating AWS resource health and spend audits',
        'Automated detection of provisioned vs consumed read/write capacity units on non-prod DynamoDB instances',
        'Auditing script reporting newly deployed or modified AWS Lambda functions within rolling time windows',
        'Collaborated with senior DevOps engineers under strict Git branching and pull request review standards',
      ],
    },

    {
      id: 'ocpp-simulator',
      title: 'EVCS OCPP 1.6 Charger Simulator & Log Analyzer',
      subtitle: 'High-Concurrency WebSocket Test Harness & Hardware Fault Injection Suite',
      category: 'distributed',
      categoryLabel: 'Distributed & IoT (.NET)',
      period: '2024',
      role: 'Systems Developer',
      status: 'Shipped',
      summary:
        'A simulation testbed and log analytics tool designed to stress-test central systems under simulated network jitter, dropped packets, and burst telemetry from multiple virtual charging stations.',
      metrics: [
        { label: 'Simulated Nodes', value: '500+ Virtual CP' },
        { label: 'Protocol', value: 'OCPP 1.6 JSON' },
        { label: 'Test Coverage', value: 'Stress & Chaos' },
        { label: 'Log Parsing', value: 'Structured Regex' },
      ],
      tags: ['C#', 'TypeScript', 'WebSockets', 'OCPP 1.6-J', 'Load Testing', 'Log Analysis'],
      problem:
        'Testing central system backends with physical $50,000+ DC fast chargers is slow, dangerous, and unable to simulate rare catastrophic electrical errors or mass connectivity loss.',
      solution:
        'Built a standalone charger simulator capable of spinning up hundreds of virtual OCPP clients that emit heartbeats, start/stop transactions, simulate emergency stop faults, and verify server failover behavior.',
      architectureHighlights: [
        'Simulates complete OCPP 1.6 transaction lifecycles: Authorize -> StartTransaction -> MeterValues -> StopTransaction',
        'Configurable packet loss and latency injection to test backend timeout and reconnect resilience',
        'Structured OCPP log analyzer parsing raw JSON frames to extract error codes and latency bottlenecks',
      ],
    },
  ] as Project[],

  experiences: [
    {
      company: 'Zero Impact Energy',
      role: 'C# .NET Developer',
      location: 'Costa Mesa, CA',
      period: 'September 2024 – Present',
      badge: 'Current Role',
      description: [
        'Developed the core EVOLV Platform backend in C# .NET Core, maintaining 1,000+ concurrent stateful WebSocket connections across 300+ live commercial EV charging locations.',
        'Engineered real-time telemetry processing pipelines for JSON-based OCPP 1.6-J and 2.0 messages, implementing robust exception handling and automated email alerts for offline or malfunctioning chargers.',
        'Decreased cyclomatic complexity by 40% across the core codebase while significantly expanding unit, integration, and system test suites.',
        'Secured all REST and GraphQL endpoints against vulnerabilities using strict JWT authentication and role-based authorization controls.',
        'Optimized critical LINQ queries and database access patterns to eliminate latency bottlenecks during peak charging hours.',
      ],
      technologies: ['C#', '.NET Core 8', 'WebSockets', 'OCPP 1.6-J', 'GraphQL', 'REST API', 'LINQ', 'SQL Server', 'xUnit'],
    },
    {
      company: 'Tutors and Friends',
      role: 'Technical Mentor (Computer Science)',
      location: 'La Jolla, CA',
      period: 'August 2023 – May 2024',
      description: [
        'Mentored college and high school students in fundamental and intermediate computer science concepts.',
        'Designed and delivered comprehensive computer science curricula covering core data types, object-oriented design, dynamic programming, graph algorithms (BFS/DFS, Dijkstra), and greedy approaches.',
        'Conducted code reviews and guided students through debugging methodologies and algorithmic problem solving.',
      ],
      technologies: ['C++', 'Python', 'Data Structures & Algorithms', 'Graph Theory', 'Greedy Algorithms'],
    },
    {
      company: 'First American',
      role: 'Azure DevOps Intern',
      location: 'Santa Ana, CA',
      period: 'June 2022 – September 2022',
      description: [
        'Engineered an automated YAML pipeline script in Azure DevOps that optimized AWS DynamoDB table configurations across developer accounts used by 100+ engineers, reducing DynamoDB cloud costs by 78%.',
        'Implemented automated pipeline scripts to audit and track recently updated AWS Lambda functions within defined release windows, increasing deployment visibility for platform engineers.',
        'Maintained structured Git branching strategies in Azure Repos and actively contributed to team code reviews integrated into CI/CD pipeline triggers.',
      ],
      technologies: ['Azure DevOps', 'YAML Pipelines', 'AWS DynamoDB', 'AWS Lambda', 'Git', 'PowerShell', 'CI/CD'],
    },
  ] as Experience[],

  skills: [
    {
      title: 'Backend & Systems Architecture',
      description: 'Distributed services, real-time protocols, and concurrent I/O',
      skills: [
        { name: 'C# / .NET Core 8', context: 'High-throughput APIs & microservices', highlight: true },
        { name: 'WebSockets & JSON-RPC', context: '1,000+ persistent concurrent connections', highlight: true },
        { name: 'OCPP 1.6-J / 2.0.1', context: 'EV charging hardware communication protocol', highlight: true },
        { name: 'ASP.NET Web API', context: 'RESTful service design, middleware & filters' },
        { name: 'GraphQL', context: 'Schema design, mutations, resolvers & subscriptions' },
        { name: 'Entity Framework Core & LINQ', context: 'Query optimization & migration management' },
        { name: 'Python', context: 'FastAPI, async workers, geospatial pipelines' },
      ],
    },
    {
      title: 'Frontend & Interactive Web',
      description: 'Responsive, accessible, and data-dense user interfaces',
      skills: [
        { name: 'TypeScript', context: 'Strict types, generics & interface modeling', highlight: true },
        { name: 'React (v18 / v19)', context: 'Hooks, state management, memoization' },
        { name: 'Next.js (App Router)', context: 'Server components, streaming & API routes' },
        { name: 'Tailwind CSS', context: 'Design tokens, dark themes & responsive layouts' },
        { name: 'Data Visualization', context: 'Recharts, SVG telemetry charts & gauges' },
      ],
    },
    {
      title: 'Databases & Spatial Compute',
      description: 'Relational data stores, indexing, and GIS geometry',
      skills: [
        { name: 'PostgreSQL & PostGIS', context: 'Geospatial joins, KNN, buffers & hex grids', highlight: true },
        { name: 'Microsoft SQL Server', context: 'Production schemas, ACID transactions & indexes' },
        { name: 'AWS DynamoDB', context: 'Key-value modeling, provisioned capacity & TTL' },
        { name: 'Redis', context: 'In-memory caching, rate limiting & message queues' },
        { name: 'SQLite', context: 'Local embedded storage & zero-config testing' },
      ],
    },
    {
      title: 'DevOps, Cloud & Developer Tooling',
      description: 'Continuous integration, cloud resources, and developer velocity',
      skills: [
        { name: 'Azure DevOps & Pipelines', context: 'Automated YAML build/deploy tasks', highlight: true },
        { name: 'AWS (RDS, S3, Lambda, DynamoDB)', context: 'Cloud infrastructure configuration' },
        { name: 'Docker & Compose', context: 'Multi-container local & staging environments' },
        { name: 'Git & GitHub / Azure Repos', context: 'Trunk-based development & code review' },
        { name: 'xUnit & Vitest', context: 'Unit, integration & test-driven development' },
        { name: 'Postman & Swagger', context: 'API contract testing & documentation' },
        { name: 'Visual Studio & VS Code', context: 'Primary development environments' },
      ],
    },
  ] as SkillCategory[],

  principles: [
    {
      number: '01',
      title: 'Deterministic Logic Before Probabilistic Hope',
      summary:
        'When integrating AI into spatial or analytical workflows, the LLM emits a strictly validated, human-reviewable plan against a closed vocabulary. The spatial/numerical engine computes deterministically. Never let a model fabricate numbers, coordinates, or financial outputs.',
    },
    {
      number: '02',
      title: 'Observability & Telemetry First',
      summary:
        'In distributed systems with 1,000+ IoT nodes, silent failures kill availability. Structured logging, latency timestamps, heartbeat watchdogs, and clear exception boundaries must be designed into day one, not retrofitted after an outage.',
    },
    {
      number: '03',
      title: 'Architect for Latency & Stateful Concurrency',
      summary:
        'Thread safety, non-blocking asynchronous I/O, optimized LINQ projections, and lean payloads are essential when hundreds of physical chargers simultaneously push meter telemetry. Every millisecond shaved from query paths preserves server headroom.',
    },
    {
      number: '04',
      title: 'Complexity Pruning & Test Reliability',
      summary:
        'Code quality is measured by what you safely remove, not how much you pile on. Lowering cyclomatic complexity by 40% while expanding xUnit/Vitest coverage ensures changes can ship with total confidence and zero regressions.',
    },
  ],
}
