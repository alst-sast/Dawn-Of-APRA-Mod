window.APRA_EVENTS = [
  {
    id:"e1985_inauguration",
    from:"1985-07-28", to:"1985-09-30",
    kicker:"THE NEW GOVERNMENT",
    title:"A New APRA Administration",
    text:"The new administration enters Palacio de Gobierno with a broad mandate for change. The party expects rapid results, while business leaders and the armed forces watch the new government closely.",
    choices:[
      {label:"Mobilize the party", detail:"Lean into APRA's political organization.", effects:{popularity:5,apra:7,military:-2}},
      {label:"Reassure institutions", detail:"Emphasize continuity, legality, and civilian authority.", effects:{democracy:4,military:4,apra:-3}},
      {label:"Focus on economic relief", detail:"Make household purchasing power the immediate priority.", effects:{popularity:7,inflation:3,business:-2}}
    ]
  },
  {
    id:"e1985_controls",
    from:"1985-09-01", to:"1986-04-30",
    kicker:"ECONOMIC POLICY",
    title:"The Price Question",
    text:"The government debates how aggressively to restrain prices and wages. Supporters argue that controls can protect households; critics warn of distortions and shortages.",
    choices:[
      {label:"Expand controls", detail:"Protect consumers through a stronger administrative approach.", effects:{inflation:-5,popularity:5,business:-7,blackMarket:6}},
      {label:"Target essential goods", detail:"Use selective controls while leaving more of the economy flexible.", effects:{inflation:-2,popularity:3,business:-2}},
      {label:"Relax controls", detail:"Give market prices more room to adjust.", effects:{inflation:4,popularity:-4,business:5}}
    ]
  },
  {
    id:"e1986_growth",
    from:"1986-01-01", to:"1987-03-31",
    kicker:"THE BOOM",
    title:"Growth Brings Confidence",
    text:"Economic activity accelerates. The government can use the improved mood to deepen its political coalition or attempt to build buffers against a future downturn.",
    choices:[
      {label:"Spend the gains", detail:"Expand public programs and strengthen popular support.", effects:{popularity:8,fiscal:6,inflation:4}},
      {label:"Build reserves", detail:"Save political capital and resources for the next crisis.", effects:{reserves:7,popularity:-2}},
      {label:"Court business investment", detail:"Seek stronger private-sector confidence.", effects:{business:8,popularity:-2,apra:-2}}
    ]
  },
  {
    id:"e1987_banking",
    from:"1987-06-01", to:"1988-01-31",
    kicker:"POLITICAL ECONOMY",
    title:"The Banking Crisis",
    text:"The administration confronts a major dispute over the financial system. Whatever course is chosen will reshape relations with business, labor, and the political opposition.",
    choices:[
      {label:"Push state control", detail:"Bring more of finance under public direction.", effects:{apra:5,popularity:3,business:-12,democracy:-2}},
      {label:"Negotiate a compromise", detail:"Seek regulatory reform without a sweeping takeover.", effects:{business:3,apra:2,popularity:1}},
      {label:"Back away", detail:"Preserve confidence by abandoning the most ambitious proposal.", effects:{business:7,apra:-6,popularity:-2}}
    ]
  },
  {
    id:"e1988_inflation",
    from:"1988-01-01", to:"1989-02-28",
    kicker:"INFLATION",
    title:"The Spiral",
    text:"Price pressures intensify. Cabinet meetings increasingly revolve around whether the government can restore monetary and fiscal credibility without destroying its political coalition.",
    choices:[
      {label:"Emergency stabilization", detail:"Accept a sharp political cost to restore macroeconomic control.", effects:{inflation:-12,popularity:-8,business:6,apra:-5}},
      {label:"Continue heterodox policy", detail:"Maintain controls and selective intervention.", effects:{inflation:-4,popularity:3,business:-5,blackMarket:5,fiscal:4}},
      {label:"Subsidize essentials", detail:"Shield households from the fastest price increases.", effects:{inflation:5,popularity:8,fiscal:8}}
    ]
  },
  {
    id:"e1989_security",
    from:"1989-01-01", to:"1990-03-31",
    kicker:"INTERNAL CONFLICT",
    title:"Security and Civilian Authority",
    text:"Violence and insecurity place new pressure on the state. Security institutions request greater latitude while civilian authorities debate oversight and effectiveness.",
    choices:[
      {label:"Expand security operations", detail:"Increase state capacity and operational resources.", effects:{security:10,military:6,democracy:-5,civilianTrust:-4}},
      {label:"Strengthen civilian oversight", detail:"Keep security policy firmly under institutional supervision.", effects:{democracy:6,military:-3,security:3}},
      {label:"Invest in local government", detail:"Address insecurity through state presence and services.", effects:{security:4,popularity:3,fiscal:5}}
    ]
  },
  {
    id:"e1990_transition",
    from:"1990-01-01", to:"1990-08-31",
    kicker:"SUCCESSION",
    title:"The Election After the Crisis",
    text:"The next administration will inherit an economy and political system shaped by the previous five years. APRA must decide whether to consolidate its organization, reform itself, or defend its record.",
    choices:[
      {label:"Defend the record", detail:"Campaign on the achievements of the APRA years.", effects:{apra:7,popularity:4}},
      {label:"Admit failures and reform", detail:"Acknowledge economic mistakes and propose renewal.", effects:{apra:2,democracy:4,popularity:2}},
      {label:"Mobilize the base", detail:"Use the party's organization to preserve influence.", effects:{apra:10,popularity:-2,democracy:-2}}
    ]
  },
  {
    id:"e1991_reckoning",
    from:"1991-01-01", to:"1992-03-31",
    kicker:"THE RECKONING",
    title:"A Country Under Strain",
    text:"The political system remains fragile. Economic stabilization, security concerns, and institutional conflict now intersect. Decisions made years earlier continue to shape the available choices.",
    choices:[
      {label:"Defend democratic institutions", detail:"Prioritize constitutional checks and civilian government.", effects:{democracy:9,military:-4,popularity:2}},
      {label:"Prioritize executive authority", detail:"Concentrate decision-making to overcome institutional paralysis.", effects:{democracy:-10,security:5,military:4}},
      {label:"Rebuild the APRA coalition", detail:"Focus on long-term party organization and political survival.", effects:{apra:10,popularity:4,business:-3}}
    ]
  },
  {
    id:"e1992_crisis",
    from:"1992-04-01", to:"1992-04-30",
    kicker:"BRANCHING HISTORY",
    title:"The Institutional Crisis",
    text:"By 1992, the country's political institutions face an extraordinary test. Your accumulated choices determine whether the state enters the crisis with resilience or profound vulnerability.",
    choices:[
      {label:"Preserve constitutional order", detail:"Accept political constraints and defend institutional continuity.", effects:{democracy:12,military:-8}},
      {label:"Seek emergency powers", detail:"Concentrate authority in the executive during the crisis.", effects:{democracy:-15,military:5,popularity:3}},
      {label:"Call for a political pact", detail:"Attempt a broad agreement among competing institutions.", effects:{democracy:6,apra:3,popularity:2}}
    ]
  }
];