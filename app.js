const TASK1_PROMPTS = [
  {
    id: "t1-bar-library",
    type: "Bar Chart",
    title: "Public Library Visits",
    prompt:
      "The bar chart compares the number of visits made to four public libraries in one city in 2000 and 2020.",
    restatement:
      "The bar chart compares the numbers of visits to four public libraries in one city in 2000 and 2020.",
    overview:
      "Overall, Central Library was the most popular site in both years, and visits increased in every library.",
    overview2:
      "The most noticeable growth was seen at Central and East Libraries, while West Library remained the least visited branch.",
    focusA:
      "Central Library recorded the highest figures throughout the period, rising from about 120,000 visits in 2000 to roughly 160,000 in 2020.",
    focusB:
      "By comparison, West Library had the lowest totals, although its number of visits still edged up slightly over the period.",
    visual: {
      kind: "bar",
      categories: ["Central", "North", "East", "West"],
      series: [
        { label: "2000", color: "#1f6d67", values: [120, 90, 70, 50] },
        { label: "2020", color: "#bd5d38", values: [160, 110, 95, 60] },
      ],
      unit: "thousand visits",
    },
  },
  {
    id: "t1-line-commute",
    type: "Line Graph",
    title: "Commuting by Transport",
    prompt:
      "The line graph shows the proportion of commuters using cars, buses and bicycles in a European city between 2005 and 2025.",
    restatement:
      "The line graph illustrates the percentages of commuters who travelled by car, bus and bicycle in a European city from 2005 to 2025.",
    overview:
      "Overall, car use declined steadily, while cycling became considerably more common over time.",
    overview2:
      "Bus travel fluctuated only slightly and ended the period in the middle of the three transport modes.",
    focusA:
      "Cars were the dominant form of transport at the beginning, at around 52%, but this figure fell continuously to approximately 34% by 2025.",
    focusB:
      "In contrast, the share of cyclists rose from about 8% to 27%, gradually approaching the proportion of bus users.",
    visual: {
      kind: "line",
      labels: ["2005", "2010", "2015", "2020", "2025"],
      series: [
        { label: "Car", color: "#a5372f", values: [52, 48, 43, 38, 34] },
        { label: "Bus", color: "#1f6d67", values: [28, 30, 29, 31, 30] },
        { label: "Bicycle", color: "#bd8a2e", values: [8, 12, 17, 22, 27] },
      ],
      unit: "%",
    },
  },
  {
    id: "t1-pie-budget",
    type: "Pie Chart",
    title: "Household Spending",
    prompt:
      "The pie charts compare how an average household allocated its monthly budget in 1995 and 2025.",
    restatement:
      "The pie charts compare the proportions of monthly household spending allocated to different categories in 1995 and 2025.",
    overview:
      "Overall, housing remained the largest expense in both years and took a larger share in 2025.",
    overview2:
      "By contrast, food and clothing became less significant parts of household expenditure over time.",
    focusA:
      "Housing accounted for 28% of spending in 1995 and then rose to 36% in 2025, consolidating its position as the biggest item.",
    focusB:
      "Meanwhile, the proportions spent on food and clothing declined, whereas transport absorbed a higher percentage in the later year.",
    visual: {
      kind: "pies",
      pies: [
        {
          title: "1995",
          values: [
            { label: "Housing", value: 28, color: "#1f6d67" },
            { label: "Food", value: 24, color: "#bd5d38" },
            { label: "Transport", value: 14, color: "#bd8a2e" },
            { label: "Clothing", value: 12, color: "#6a6f7d" },
            { label: "Other", value: 22, color: "#8c9d96" },
          ],
        },
        {
          title: "2025",
          values: [
            { label: "Housing", value: 36, color: "#1f6d67" },
            { label: "Food", value: 18, color: "#bd5d38" },
            { label: "Transport", value: 21, color: "#bd8a2e" },
            { label: "Clothing", value: 8, color: "#6a6f7d" },
            { label: "Other", value: 17, color: "#8c9d96" },
          ],
        },
      ],
    },
  },
  {
    id: "t1-map-harbor",
    type: "Map",
    title: "Harbor Redevelopment",
    prompt:
      "The maps show the changes that took place in a coastal harbor area between 1980 and the present day.",
    restatement:
      "The maps illustrate how a coastal harbor area changed between 1980 and the present day.",
    overview:
      "Overall, the harbor was transformed from an industrial zone into a mixed-use area with more housing and leisure facilities.",
    overview2:
      "Transport access was also improved, and several former industrial buildings disappeared altogether.",
    focusA:
      "In 1980, the western side was dominated by warehouses and a shipyard, but these features were later replaced by apartments and shops.",
    focusB:
      "At the same time, the waterfront became more accessible thanks to a new road, a marina and visitor amenities.",
    visual: {
      kind: "mapCompare",
      panels: [
        {
          title: "1980",
          items: [
            { label: "Warehouse", x: 20, y: 18, w: 82, h: 34, color: "#9f7a63" },
            { label: "Shipyard", x: 20, y: 66, w: 82, h: 40, color: "#7c6050" },
            { label: "Road", x: 112, y: 16, w: 18, h: 106, color: "#d8c9b7" },
            { label: "Dock", x: 138, y: 26, w: 86, h: 84, color: "#8db6c8" },
          ],
        },
        {
          title: "Now",
          items: [
            { label: "Apartments", x: 20, y: 18, w: 82, h: 34, color: "#7ea592" },
            { label: "Shops", x: 20, y: 66, w: 82, h: 22, color: "#d99c79" },
            { label: "Marina", x: 138, y: 22, w: 86, h: 52, color: "#8db6c8" },
            { label: "Cafe", x: 138, y: 82, w: 40, h: 24, color: "#f0c49a" },
            { label: "Path", x: 112, y: 16, w: 18, h: 106, color: "#d8c9b7" },
          ],
        },
      ],
    },
  },
  {
    id: "t1-table-energy",
    type: "Table",
    title: "Energy Consumption by Sector",
    prompt:
      "The table shows the amount of energy consumed by the residential, industrial and transport sectors in five countries in 2023.",
    restatement:
      "The table compares the amount of energy used by the residential, industrial and transport sectors in five countries in 2023.",
    overview:
      "Overall, industry consumed the most energy in most countries, while the residential sector generally recorded the lowest figures.",
    overview2:
      "Country A had the largest totals overall, whereas Country E showed the smallest levels of consumption.",
    focusA:
      "Industrial demand was particularly high in Country A, at 260 units, compared with 180 for transport and 120 for households.",
    focusB:
      "At the other end of the scale, Country E posted the lowest figures in all three sectors, especially in residential use.",
    visual: {
      kind: "table",
      columns: ["Country", "Residential", "Industrial", "Transport"],
      rows: [
        ["A", "120", "260", "180"],
        ["B", "98", "210", "160"],
        ["C", "102", "190", "170"],
        ["D", "88", "175", "140"],
        ["E", "70", "132", "105"],
      ],
    },
  },
  {
    id: "t1-process-recycle",
    type: "Process Diagram",
    title: "Plastic Bottle Recycling",
    prompt: "The diagram shows how plastic bottles are recycled.",
    restatement:
      "The process diagram illustrates how plastic bottles are recycled.",
    overview:
      "Overall, the process involves several linear stages, beginning with collection and ending with the manufacture of new products.",
    overview2:
      "The material is sorted and processed before it is converted into reusable raw plastic.",
    focusA:
      "First, used bottles are collected, sorted and compressed so that they can be transported for further treatment.",
    focusB:
      "After being crushed and heated, the material is formed into raw plastic and then used to make new items such as bottles and packaging.",
    visual: {
      kind: "process",
      steps: [
        "Collection",
        "Sorting",
        "Compression",
        "Crushing",
        "Heating",
        "Raw Plastic",
        "New Products",
      ],
    },
  },
  {
    id: "t1-mixed-sales",
    type: "Mixed Charts",
    title: "Online Sales and Returns",
    prompt:
      "The bar chart shows online sales in four regions, while the pie chart indicates the reasons for product returns in 2024.",
    restatement:
      "The bar chart compares online sales in four regions, while the pie chart shows the reasons for product returns in 2024.",
    overview:
      "Overall, the North recorded the highest sales, and damaged goods were the most common reason for returns.",
    overview2:
      "The South had the weakest sales performance, while the two largest return categories together made up a clear majority of cases.",
    focusA:
      "Sales were highest in the North at about 420 units, compared with only 210 in the South.",
    focusB:
      "Regarding returns, damaged items accounted for 38%, followed by incorrect products at 26%, whereas late delivery was less common.",
    visual: {
      kind: "mixed",
      bar: {
        categories: ["North", "East", "West", "South"],
        series: [{ label: "Sales", color: "#1f6d67", values: [420, 360, 290, 210] }],
        unit: "units",
      },
      pie: {
        title: "Return Reasons",
        values: [
          { label: "Damaged", value: 38, color: "#bd5d38" },
          { label: "Wrong item", value: 26, color: "#1f6d67" },
          { label: "Late delivery", value: 18, color: "#bd8a2e" },
          { label: "Other", value: 18, color: "#8c9d96" },
        ],
      },
    },
  },
  {
    id: "t1-line-population",
    type: "Line Graph",
    title: "Urban Population Growth",
    prompt:
      "The line graph compares the urban population of three Asian cities from 1990 to 2030.",
    restatement:
      "The line graph compares changes in the urban populations of three Asian cities between 1990 and 2030.",
    overview:
      "Overall, all three cities experienced population growth, but City A expanded much faster than the others.",
    overview2:
      "City B and City C also grew steadily, although their increases were less dramatic.",
    focusA:
      "City A rose sharply from around 3 million in 1990 to a projected 8.5 million in 2030.",
    focusB:
      "By comparison, the populations of City B and City C followed gentler upward trends and stayed below 6 million throughout.",
    visual: {
      kind: "line",
      labels: ["1990", "2000", "2010", "2020", "2030"],
      series: [
        { label: "City A", color: "#bd5d38", values: [3.0, 4.1, 5.6, 7.1, 8.5] },
        { label: "City B", color: "#1f6d67", values: [2.8, 3.2, 3.9, 4.7, 5.5] },
        { label: "City C", color: "#bd8a2e", values: [2.0, 2.5, 3.0, 3.6, 4.3] },
      ],
      unit: "million",
    },
  },
  {
    id: "t1-bar-internet",
    type: "Bar Chart",
    title: "Internet Access by Age Group",
    prompt:
      "The bar chart compares the percentage of people in five age groups who had access to the internet in 2008 and 2024.",
    restatement:
      "The bar chart compares the proportions of people in five age groups who had internet access in 2008 and 2024.",
    overview:
      "Overall, internet access increased across all age groups, and younger people consistently recorded the highest figures.",
    overview2:
      "The sharpest rise occurred among the oldest groups, although their percentages still remained below those of younger adults.",
    focusA:
      "Among people aged 18 to 34, access was already high in 2008 and climbed further to almost universal levels by 2024.",
    focusB:
      "By contrast, the 65-plus group started from the lowest base but experienced the most dramatic growth over the period.",
    visual: {
      kind: "bar",
      categories: ["18-24", "25-34", "35-49", "50-64", "65+"],
      series: [
        { label: "2008", color: "#1f6d67", values: [82, 79, 64, 48, 22] },
        { label: "2024", color: "#bd5d38", values: [98, 97, 91, 84, 68] },
      ],
      unit: "%",
    },
  },
  {
    id: "t1-line-tourism",
    type: "Line Graph",
    title: "International Tourist Arrivals",
    prompt:
      "The line graph shows the number of international tourists visiting three island destinations between 2010 and 2025.",
    restatement:
      "The line graph illustrates the numbers of international tourists who visited three island destinations from 2010 to 2025.",
    overview:
      "Overall, visitor numbers rose in all three destinations, but Island A saw by far the strongest growth.",
    overview2:
      "Island C remained the least popular throughout the period despite a gradual upward trend.",
    focusA:
      "Island A climbed sharply from 0.8 million visitors in 2010 to around 3.6 million in 2025, overtaking the other islands early on.",
    focusB:
      "Meanwhile, Islands B and C increased more steadily, with Island C staying at the bottom across the whole period.",
    visual: {
      kind: "line",
      labels: ["2010", "2013", "2016", "2019", "2022", "2025"],
      series: [
        { label: "Island A", color: "#bd5d38", values: [0.8, 1.3, 2.0, 2.7, 3.2, 3.6] },
        { label: "Island B", color: "#1f6d67", values: [1.1, 1.4, 1.8, 2.1, 2.3, 2.5] },
        { label: "Island C", color: "#bd8a2e", values: [0.5, 0.7, 0.9, 1.1, 1.2, 1.4] },
      ],
      unit: "million",
    },
  },
  {
    id: "t1-table-smartphone",
    type: "Table",
    title: "Smartphone Ownership",
    prompt:
      "The table compares smartphone ownership rates among adults in six countries in 2012 and 2024.",
    restatement:
      "The table compares the percentages of adults who owned a smartphone in six countries in 2012 and 2024.",
    overview:
      "Overall, smartphone ownership rose markedly in every country, with Country F recording the highest figure in 2024.",
    overview2:
      "Although Country A had the lowest starting point, it also registered one of the most substantial increases.",
    focusA:
      "In 2024, the leading countries posted ownership rates of over 90%, which was far higher than their already significant levels in 2012.",
    focusB:
      "At the lower end, Country A and Country B began well below the others but narrowed the gap considerably by the end of the period.",
    visual: {
      kind: "table",
      columns: ["Country", "2012", "2024"],
      rows: [
        ["A", "28", "76"],
        ["B", "34", "81"],
        ["C", "49", "88"],
        ["D", "53", "91"],
        ["E", "57", "93"],
        ["F", "61", "95"],
      ],
    },
  },
  {
    id: "t1-pie-water",
    type: "Pie Chart",
    title: "Household Water Use",
    prompt:
      "The pie charts show how household water was used in a city in 1990 and 2025.",
    restatement:
      "The pie charts compare the proportions of household water use devoted to different purposes in 1990 and 2025.",
    overview:
      "Overall, bathroom use remained the largest category in both years, while garden use accounted for a smaller share in 2025.",
    overview2:
      "By contrast, the proportion used for kitchens rose slightly, indicating a modest redistribution of water consumption.",
    focusA:
      "Bathroom use represented the largest share in both years, slipping only slightly from 42% in 1990 to 39% in 2025.",
    focusB:
      "Garden watering, on the other hand, fell noticeably, whereas kitchen use and other domestic purposes became marginally more prominent.",
    visual: {
      kind: "pies",
      pies: [
        {
          title: "1990",
          values: [
            { label: "Bathroom", value: 42, color: "#1f6d67" },
            { label: "Kitchen", value: 21, color: "#bd5d38" },
            { label: "Laundry", value: 17, color: "#bd8a2e" },
            { label: "Garden", value: 14, color: "#7e8d94" },
            { label: "Other", value: 6, color: "#a4ab90" },
          ],
        },
        {
          title: "2025",
          values: [
            { label: "Bathroom", value: 39, color: "#1f6d67" },
            { label: "Kitchen", value: 24, color: "#bd5d38" },
            { label: "Laundry", value: 18, color: "#bd8a2e" },
            { label: "Garden", value: 10, color: "#7e8d94" },
            { label: "Other", value: 9, color: "#a4ab90" },
          ],
        },
      ],
    },
  },
  {
    id: "t1-process-coffee",
    type: "Process Diagram",
    title: "Coffee Production",
    prompt:
      "The diagram illustrates the process of producing coffee from beans to packaged products.",
    restatement:
      "The process diagram illustrates how coffee is produced from harvested beans to the final packaged product.",
    overview:
      "Overall, coffee production is a linear process involving harvesting, treatment, roasting and packaging.",
    overview2:
      "The beans are processed in several stages before being prepared for sale.",
    focusA:
      "Initially, ripe coffee cherries are harvested and the beans are separated, dried and cleaned.",
    focusB:
      "The processed beans are then roasted, ground if necessary and finally packed for distribution.",
    visual: {
      kind: "process",
      steps: ["Harvest", "Separate", "Dry", "Clean", "Roast", "Grind", "Package"],
    },
  },
  {
    id: "t1-map-park",
    type: "Map",
    title: "City Park Renovation",
    prompt:
      "The maps show the layout of a city park in 2005 and after redevelopment in 2025.",
    restatement:
      "The maps compare the layout of a city park in 2005 with its appearance after redevelopment in 2025.",
    overview:
      "Overall, the park was modernised extensively, with more recreational facilities and improved paths.",
    overview2:
      "Several open areas were reorganised to accommodate new amenities for visitors.",
    focusA:
      "The original central lawn was reduced in size to make room for a cafe, a playground and additional seating areas.",
    focusB:
      "Meanwhile, the park became easier to navigate thanks to new walkways and a clearer entrance arrangement.",
    visual: {
      kind: "mapCompare",
      panels: [
        {
          title: "2005",
          items: [
            { label: "Lawn", x: 20, y: 18, w: 92, h: 50, color: "#7ea592" },
            { label: "Lake", x: 136, y: 20, w: 78, h: 46, color: "#8db6c8" },
            { label: "Trees", x: 26, y: 80, w: 60, h: 28, color: "#729268" },
            { label: "Path", x: 108, y: 76, w: 18, h: 44, color: "#d8c9b7" },
          ],
        },
        {
          title: "2025",
          items: [
            { label: "Cafe", x: 20, y: 18, w: 58, h: 28, color: "#d99c79" },
            { label: "Playground", x: 20, y: 56, w: 70, h: 30, color: "#f0c49a" },
            { label: "Lake", x: 140, y: 20, w: 74, h: 46, color: "#8db6c8" },
            { label: "Seats", x: 102, y: 76, w: 44, h: 24, color: "#c6b199" },
            { label: "Paths", x: 156, y: 76, w: 18, h: 44, color: "#d8c9b7" },
          ],
        },
      ],
    },
  },
  {
    id: "t1-bar-enrolment",
    type: "Bar Chart",
    title: "University Enrolment by Faculty",
    prompt:
      "The bar chart compares the numbers of students enrolled in four university faculties in 2015 and 2025.",
    restatement:
      "The bar chart compares student enrolment in four university faculties in 2015 and 2025.",
    overview:
      "Overall, enrolment increased in most faculties, and Business remained the largest department in both years.",
    overview2:
      "Arts was the smallest faculty throughout the period, despite experiencing a moderate rise in student numbers.",
    focusA:
      "Business attracted the highest number of students in both years, increasing from 8,000 to about 10,500.",
    focusB:
      "By comparison, Arts enrolled the fewest students, while Engineering also recorded solid growth over the decade.",
    visual: {
      kind: "bar",
      categories: ["Business", "Engineering", "Science", "Arts"],
      series: [
        { label: "2015", color: "#1f6d67", values: [8.0, 6.5, 5.8, 4.1] },
        { label: "2025", color: "#bd5d38", values: [10.5, 8.3, 6.2, 4.8] },
      ],
      unit: "thousand students",
    },
  },
  {
    id: "t1-line-energymix",
    type: "Line Graph",
    title: "Electricity Mix",
    prompt:
      "The line graph shows the percentage of electricity generated from coal, gas and renewable sources in one country between 2000 and 2025.",
    restatement:
      "The line graph illustrates the proportions of electricity produced from coal, gas and renewable energy in one country from 2000 to 2025.",
    overview:
      "Overall, coal became much less important, whereas renewables expanded steadily across the period.",
    overview2:
      "Gas fluctuated moderately and ended the period as the largest single source of electricity generation.",
    focusA:
      "Coal started as the dominant source at around 48%, but its share declined sharply to roughly 18% by 2025.",
    focusB:
      "Renewables moved in the opposite direction, rising continuously from about 10% to nearly 35%, while gas changed less dramatically.",
    visual: {
      kind: "line",
      labels: ["2000", "2005", "2010", "2015", "2020", "2025"],
      series: [
        { label: "Coal", color: "#a5372f", values: [48, 44, 37, 29, 23, 18] },
        { label: "Gas", color: "#1f6d67", values: [29, 31, 33, 35, 36, 37] },
        { label: "Renewables", color: "#bd8a2e", values: [10, 13, 18, 24, 30, 35] },
      ],
      unit: "%",
    },
  },
  {
    id: "t1-mixed-museum",
    type: "Mixed Charts",
    title: "Museum Visitors and Feedback",
    prompt:
      "The bar chart compares visitor numbers at four museums in 2024, while the pie chart shows visitors' main reasons for attending.",
    restatement:
      "The bar chart compares the numbers of visitors to four museums in 2024, and the pie chart illustrates the main reasons why people attended.",
    overview:
      "Overall, the History Museum attracted the largest number of visitors, and education was the most common reason for attending.",
    overview2:
      "The smallest museum still received a substantial audience, while leisure and tourism together accounted for a significant share of visits.",
    focusA:
      "The History Museum topped the list with about 620,000 visitors, compared with only 310,000 at the Science Museum.",
    focusB:
      "In the pie chart, education made up 35% of responses, while leisure and tourism together accounted for just over two-fifths.",
    visual: {
      kind: "mixed",
      bar: {
        categories: ["History", "Art", "Natural", "Science"],
        series: [{ label: "Visitors", color: "#1f6d67", values: [620, 540, 430, 310] }],
        unit: "thousand",
      },
      pie: {
        title: "Visit Reasons",
        values: [
          { label: "Education", value: 35, color: "#bd5d38" },
          { label: "Leisure", value: 24, color: "#1f6d67" },
          { label: "Tourism", value: 18, color: "#bd8a2e" },
          { label: "Events", value: 13, color: "#7e8d94" },
          { label: "Other", value: 10, color: "#a4ab90" },
        ],
      },
    },
  },
  {
    id: "t1-table-airline",
    type: "Table",
    title: "Airline Performance",
    prompt:
      "The table compares the on-time arrival rate, average ticket price and passenger numbers for five airlines in 2024.",
    restatement:
      "The table compares five airlines in terms of on-time arrival rates, average ticket prices and passenger numbers in 2024.",
    overview:
      "Overall, the airline with the highest punctuality did not have the largest number of passengers, and ticket prices varied considerably.",
    overview2:
      "Airline D served the most passengers, while Airline B charged the highest average fare.",
    focusA:
      "Airline D carried 28 million passengers, clearly ahead of the others, even though its punctuality was only moderate at 83%.",
    focusB:
      "By contrast, Airline B had the most expensive tickets and the highest on-time rate, but its passenger total was comparatively modest.",
    visual: {
      kind: "table",
      columns: ["Airline", "On-time %", "Avg Fare", "Passengers"],
      rows: [
        ["A", "81", "$210", "18m"],
        ["B", "89", "$285", "14m"],
        ["C", "77", "$198", "16m"],
        ["D", "83", "$230", "28m"],
        ["E", "85", "$240", "20m"],
      ],
    },
  },
  {
    id: "t1-process-cement",
    type: "Process Diagram",
    title: "Cement Manufacturing",
    prompt:
      "The diagram shows how cement is manufactured for use in concrete production.",
    restatement:
      "The process diagram illustrates how cement is produced for use in making concrete.",
    overview:
      "Overall, cement production is a multi-stage industrial process that ends with grinding, after which the product can be mixed with other materials to make concrete.",
    overview2:
      "The raw materials are crushed and heated before the final product is prepared.",
    focusA:
      "First, limestone and clay are crushed into powder and then transferred to a mixer before entering a rotating heater.",
    focusB:
      "The heated material is subsequently ground to make cement, which can then be combined with gravel, sand and water in a concrete mixer.",
    visual: {
      kind: "process",
      steps: ["Crush", "Mix", "Heat", "Grind", "Cement", "Mix Additives", "Concrete"],
    },
  },
  {
    id: "t1-map-town",
    type: "Map",
    title: "Town Centre Changes",
    prompt:
      "The maps show changes to a town centre between 1995 and the present day.",
    restatement:
      "The maps compare the layout of a town centre in 1995 with its current arrangement.",
    overview:
      "Overall, the town centre has become more commercialised and pedestrian-friendly than it was in 1995.",
    overview2:
      "Several old facilities disappeared, while shopping and transport infrastructure expanded.",
    focusA:
      "A former car park and small market area were replaced by a shopping complex and a larger public square.",
    focusB:
      "At the same time, the road system was reorganised, resulting in better pedestrian access and a clearer bus route.",
    visual: {
      kind: "mapCompare",
      panels: [
        {
          title: "1995",
          items: [
            { label: "Market", x: 20, y: 18, w: 68, h: 30, color: "#d99c79" },
            { label: "Car Park", x: 20, y: 58, w: 68, h: 38, color: "#c6b199" },
            { label: "Main Road", x: 102, y: 16, w: 18, h: 104, color: "#d8c9b7" },
            { label: "Shops", x: 136, y: 18, w: 86, h: 78, color: "#7ea592" },
          ],
        },
        {
          title: "Now",
          items: [
            { label: "Mall", x: 20, y: 18, w: 74, h: 42, color: "#7ea592" },
            { label: "Square", x: 20, y: 68, w: 74, h: 28, color: "#f0c49a" },
            { label: "Bus Lane", x: 102, y: 16, w: 18, h: 104, color: "#d8c9b7" },
            { label: "Cafe Row", x: 136, y: 18, w: 86, h: 28, color: "#d99c79" },
            { label: "Shops", x: 136, y: 56, w: 86, h: 40, color: "#7ea592" },
          ],
        },
      ],
    },
  },
];

const TASK2_PROMPTS = [
  {
    id: "t2-education",
    mode: "Discussion + Opinion",
    title: "University and Employment",
    prompt:
      "Some people believe that university education should prepare students for employment, while others think it should focus on knowledge for its own sake. Discuss both views and give your opinion.",
  },
  {
    id: "t2-technology",
    mode: "Advantages / Disadvantages",
    title: "AI in Daily Life",
    prompt:
      "Artificial intelligence is becoming part of daily life. Do the advantages of this trend outweigh the disadvantages?",
  },
  {
    id: "t2-environment",
    mode: "Discussion + Opinion",
    title: "Individual vs Government Action",
    prompt:
      "Some people think environmental problems should be solved by individuals, while others believe governments and large companies should take responsibility. Discuss both sides and give your opinion.",
  },
  {
    id: "t2-work",
    mode: "Problems / Benefits",
    title: "Remote Work Culture",
    prompt:
      "Many employees now work from home. What are the main benefits and drawbacks of remote working?",
  },
  {
    id: "t2-health",
    mode: "Agree / Disagree",
    title: "Public Health Policy",
    prompt:
      "In order to improve public health, governments should impose higher taxes on unhealthy food. To what extent do you agree or disagree?",
  },
  {
    id: "t2-transport",
    mode: "Agree / Disagree",
    title: "Free Public Transport",
    prompt:
      "Some people think public transport should be free in cities. To what extent do you agree or disagree?",
  },
  {
    id: "t2-children-screen",
    mode: "Causes / Solutions",
    title: "Children and Screen Time",
    prompt:
      "Many children spend too much time using smartphones and tablets. What problems can this cause, and what measures could be taken to address them?",
  },
  {
    id: "t2-tourism",
    mode: "Discussion + Opinion",
    title: "Tourism and Culture",
    prompt:
      "Some people believe tourism benefits local culture, while others think it damages traditional ways of life. Discuss both views and give your opinion.",
  },
  {
    id: "t2-crime",
    mode: "Discussion + Opinion",
    title: "Longer Prison Sentences",
    prompt:
      "Some people believe that longer prison sentences are the best way to reduce crime, while others think there are more effective alternatives. Discuss both views and give your opinion.",
  },
  {
    id: "t2-advertising",
    mode: "Advantages / Disadvantages",
    title: "Advertising to Children",
    prompt:
      "Advertising aimed at children should be strictly controlled. Do the advantages of this policy outweigh the disadvantages?",
  },
  {
    id: "t2-history",
    mode: "Agree / Disagree",
    title: "History vs Science",
    prompt:
      "Schools should spend more time teaching science and less time teaching history. To what extent do you agree or disagree?",
  },
  {
    id: "t2-city-life",
    mode: "Problems / Solutions",
    title: "Life in Large Cities",
    prompt:
      "Living in large cities creates many problems for people. What are the main problems, and how can these be solved?",
  },
  {
    id: "t2-space",
    mode: "Agree / Disagree",
    title: "Space Exploration Spending",
    prompt:
      "Governments spend too much money on space exploration when there are more urgent needs on Earth. To what extent do you agree or disagree?",
  },
  {
    id: "t2-aging",
    mode: "Discussion + Opinion",
    title: "An Aging Population",
    prompt:
      "An increasing proportion of the population in many countries is elderly. Some people think this creates problems for society, while others believe there are benefits. Discuss both views and give your opinion.",
  },
  {
    id: "t2-food",
    mode: "Direct Question",
    title: "Imported Food",
    prompt:
      "Many countries import large amounts of food from other parts of the world. Why is this happening, and is this a positive or negative development?",
  },
  {
    id: "t2-books",
    mode: "Discussion + Opinion",
    title: "Printed Books and E-books",
    prompt:
      "Some people think printed books will never disappear, while others believe digital reading will replace them. Discuss both views and give your opinion.",
  },
  {
    id: "t2-uniform",
    mode: "Agree / Disagree",
    title: "School Uniforms",
    prompt:
      "All students should be required to wear school uniforms. To what extent do you agree or disagree?",
  },
  {
    id: "t2-sports",
    mode: "Discussion + Opinion",
    title: "Funding Elite Sports",
    prompt:
      "Some people think governments should spend money on elite sports, while others believe it should be used to encourage ordinary people to exercise. Discuss both views and give your opinion.",
  },
  {
    id: "t2-online-learning",
    mode: "Advantages / Disadvantages",
    title: "Online Learning",
    prompt:
      "More students are choosing to study online rather than attend classes in person. Do the advantages of this trend outweigh the disadvantages?",
  },
  {
    id: "t2-jobsat",
    mode: "Causes / Solutions",
    title: "Job Satisfaction",
    prompt:
      "Many people are unhappy with their jobs. Why is this the case, and what can employers do to improve job satisfaction?",
  },
];

const WRITING_FLOW = [
  {
    key: "restatement",
    label: "1. Introduction",
    subtitle: "先改寫題目，不加入評論",
    placeholder: "The bar chart compares ...",
    starters: (prompt) => [
      prompt.restatement,
      "The given chart illustrates the changes in ...",
    ],
  },
  {
    key: "overall",
    label: "2. Overview Sentence 1",
    subtitle: "先講最大趨勢，不塞細節數字",
    placeholder: "Overall, it is clear that ...",
    starters: (prompt) => [
      prompt.overview,
      "Overall, it is clear that ...",
    ],
  },
  {
    key: "overall2",
    label: "3. Overview Sentence 2",
    subtitle: "補一個最高最低或明顯差異",
    placeholder: "In general, ... was the highest, whereas ...",
    starters: (prompt) => [
      prompt.overview2,
      "In general, the most striking feature is that ...",
    ],
  },
  {
    key: "body1Main",
    label: "4. Body Paragraph 1 Topic",
    subtitle: "先決定第一段分組邏輯",
    placeholder: "Turning to the main details, ...",
    starters: (prompt) => [
      prompt.focusA,
      "Turning to the first group, ...",
    ],
  },
  {
    key: "body1Detail1",
    label: "5. Body Paragraph 1 Detail A",
    subtitle: "補一個具體數字或比較",
    placeholder: "This figure rose from ... to ...",
    starters: () => [
      "This figure rose from ... to ...",
      "It was considerably higher than ...",
    ],
  },
  {
    key: "body1Detail2",
    label: "6. Body Paragraph 1 Detail B",
    subtitle: "補第二個 supporting detail",
    placeholder: "By contrast, ... stood at ...",
    starters: () => [
      "By contrast, ... stood at ...",
      "Meanwhile, the corresponding figure for ... was ...",
    ],
  },
  {
    key: "body2Main",
    label: "7. Body Paragraph 2 Topic",
    subtitle: "第二段處理另一組資訊",
    placeholder: "Looking at the remaining categories, ...",
    starters: (prompt) => [
      prompt.focusB,
      "Looking at the remaining categories, ...",
    ],
  },
  {
    key: "body2Detail1",
    label: "8. Body Paragraph 2 Detail A",
    subtitle: "補第三個數字或倍數差異",
    placeholder: "... remained lower than ... throughout the period.",
    starters: () => [
      "... remained lower than ... throughout the period.",
      "... accounted for ...%, compared with ...%.",
    ],
  },
  {
    key: "body2Detail2",
    label: "9. Body Paragraph 2 Detail B",
    subtitle: "最後補一個收束比較",
    placeholder: "Taken together, these figures suggest that ...",
    starters: () => [
      "Taken together, these figures suggest that ...",
      "This means that the gap between ... and ... widened slightly.",
    ],
  },
];

const SECTION_LABELS = WRITING_FLOW.reduce((accumulator, item) => {
  accumulator[item.key] = item.label;
  return accumulator;
}, {});

const TASK1_SECTION_KEYS = WRITING_FLOW.map((item) => item.key);

const STORAGE_KEY = "ielts-writing-studio-state-v2";
const LEGACY_STORAGE_KEY = "ielts-writing-studio-state-v1";
const DEFAULT_DRAFT = {
  restatement: "",
  overall: "",
  overall2: "",
  body1Main: "",
  body1Detail1: "",
  body1Detail2: "",
  body2Main: "",
  body2Detail1: "",
  body2Detail2: "",
  task2Essay: "",
};

const DEFAULT_STATE = {
  reminderEnabled: true,
  reminderTime: "17:00",
  lastReminderDate: "",
  currentTask1Id: TASK1_PROMPTS[0].id,
  currentTask2Id: TASK2_PROMPTS[0].id,
  task2Unlocked: false,
  ankiAutoDownload: false,
  draft: { ...DEFAULT_DRAFT },
  latestResult: null,
};

const state = loadState();
const runtime = {
  ai: {
    available: false,
    configured: false,
    model: "gpt-5.2",
    reasoningEffort: "high",
  },
};

const elements = {
  nextReminder: document.getElementById("next-reminder"),
  liveWordCount: document.getElementById("live-word-count"),
  task2Status: document.getElementById("task2-status"),
  task1BankSize: document.getElementById("task1-bank-size"),
  task2BankSize: document.getElementById("task2-bank-size"),
  currentTask1Type: document.getElementById("current-task1-type"),
  currentTask1Title: document.getElementById("current-task1-title"),
  currentTask2Title: document.getElementById("current-task2-title"),
  currentTask2Mode: document.getElementById("current-task2-mode"),
  reminderForm: document.getElementById("reminder-form"),
  reminderTime: document.getElementById("reminder-time"),
  reminderEnabled: document.getElementById("reminder-enabled"),
  ankiAutoDownload: document.getElementById("anki-auto-download"),
  requestNotification: document.getElementById("request-notification"),
  testReminder: document.getElementById("test-reminder"),
  task1PromptCard: document.getElementById("task1-prompt-card"),
  task2PromptCard: document.getElementById("task2-prompt-card"),
  task1Flow: document.getElementById("task1-flow"),
  shuffleTask1: document.getElementById("shuffle-task1"),
  shuffleTask2: document.getElementById("shuffle-task2"),
  previewTask1: document.getElementById("preview-task1"),
  scoreTask1: document.getElementById("score-task1"),
  task1Preview: document.getElementById("task1-preview"),
  task1PreviewMeta: document.getElementById("task1-preview-meta"),
  task2Tab: document.getElementById("task2-tab"),
  task2LockHint: document.getElementById("task2-lock-hint"),
  task2Essay: document.getElementById("task2-essay"),
  scoreSummary: document.getElementById("score-summary"),
  lastScoreTime: document.getElementById("last-score-time"),
  correctionCards: document.getElementById("correction-cards"),
  filterSection: document.getElementById("filter-section"),
  filterType: document.getElementById("filter-type"),
  ankiExport: document.getElementById("anki-export"),
  downloadAnki: document.getElementById("download-anki"),
  reminderDialog: document.getElementById("reminder-dialog"),
  jumpToTask1: document.getElementById("jump-to-task1"),
  closeReminderDialog: document.getElementById("close-reminder-dialog"),
  resultDialog: document.getElementById("result-dialog"),
  closeResultDialog: document.getElementById("close-result-dialog"),
  resultDialogContent: document.getElementById("result-dialog-content"),
  tabs: Array.from(document.querySelectorAll(".tab-button")),
  panels: Array.from(document.querySelectorAll(".tab-panel")),
};

init();

function init() {
  hydrateForm();
  renderPromptCards();
  renderWritingFlow();
  renderDashboardStats();
  renderTask2Lock();
  bindEvents();
  updatePreview();
  updateReminderLabel();
  renderLatestResult();
  populateFilters();
  refreshAiStatus();
  setInterval(() => checkReminder(new Date()), 15000);
  checkReminder(new Date());
}

function bindEvents() {
  elements.reminderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.reminderTime = elements.reminderTime.value || "17:00";
    state.reminderEnabled = elements.reminderEnabled.checked;
    state.ankiAutoDownload = elements.ankiAutoDownload.checked;
    saveState();
    updateReminderLabel();
  });

  elements.requestNotification.addEventListener("click", async () => {
    if (!("Notification" in window)) {
      alert("這個瀏覽器不支援通知功能。");
      return;
    }
    await Notification.requestPermission();
  });

  elements.testReminder.addEventListener("click", () => openReminderModal(true));

  elements.shuffleTask1.addEventListener("click", () => {
    state.currentTask1Id = pickRandom(TASK1_PROMPTS, state.currentTask1Id).id;
    resetTask1Session();
    saveState();
    renderPromptCards();
    renderWritingFlow();
    renderDashboardStats();
    renderLatestResult();
    populateFilters();
    renderCorrectionCards();
    updatePreview();
  });

  elements.shuffleTask2.addEventListener("click", () => {
    state.currentTask2Id = pickRandom(TASK2_PROMPTS, state.currentTask2Id).id;
    resetTask2Draft();
    saveState();
    renderPromptCards();
    renderDashboardStats();
  });

  elements.previewTask1.addEventListener("click", () => updatePreview(true));
  elements.scoreTask1.addEventListener("click", () => {
    void scoreCurrentTask1();
  });
  elements.downloadAnki.addEventListener("click", downloadAnkiExport);
  elements.filterSection.addEventListener("change", renderCorrectionCards);
  elements.filterType.addEventListener("change", renderCorrectionCards);
  elements.closeReminderDialog.addEventListener("click", () => elements.reminderDialog.close());
  elements.closeResultDialog.addEventListener("click", () => elements.resultDialog.close());
  elements.jumpToTask1.addEventListener("click", () => {
    elements.reminderDialog.close();
    activateTab("task1");
    const firstInput = elements.task1Flow.querySelector("textarea[data-section-key='restatement']");
    if (firstInput) {
      firstInput.focus();
    }
  });

  elements.tabs.forEach((tabButton) => {
    tabButton.addEventListener("click", () => {
      const tabName = tabButton.dataset.tab;
      if (tabName === "task2" && !state.task2Unlocked) {
        return;
      }
      activateTab(tabName);
    });
  });

  elements.task1Flow.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLTextAreaElement)) {
      return;
    }

    const key = target.dataset.sectionKey;
    if (!key) {
      return;
    }

    state.draft[key] = target.value;
    saveState();
    updatePreview();
  });

  elements.task1Flow.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-insert-text]");
    if (!trigger) {
      return;
    }

    const targetKey = trigger.dataset.targetKey;
    const text = trigger.dataset.insertText || "";
    if (!targetKey || !text) {
      return;
    }

    const textarea = elements.task1Flow.querySelector(`textarea[data-section-key="${targetKey}"]`);
    if (!(textarea instanceof HTMLTextAreaElement)) {
      return;
    }

    textarea.value = mergeStarterText(textarea.value, text);
    state.draft[targetKey] = textarea.value;
    saveState();
    updatePreview();
    textarea.focus();
  });

  elements.task2Essay.value = state.draft.task2Essay || "";
  elements.task2Essay.addEventListener("input", () => {
    state.draft.task2Essay = elements.task2Essay.value;
    saveState();
  });

  document.querySelectorAll("[data-insert-task2]").forEach((button) => {
    button.addEventListener("click", () => {
      const snippet = button.dataset.insertTask2 || "";
      elements.task2Essay.value = mergeStarterText(elements.task2Essay.value, snippet);
      state.draft.task2Essay = elements.task2Essay.value;
      saveState();
      elements.task2Essay.focus();
    });
  });
}

function hydrateForm() {
  elements.reminderTime.value = state.reminderTime;
  elements.reminderEnabled.checked = state.reminderEnabled;
  elements.ankiAutoDownload.checked = state.ankiAutoDownload;
}

function renderPromptCards() {
  const task1Prompt = getCurrentTask1Prompt();
  const task2Prompt = getCurrentTask2Prompt();
  const task1Index = TASK1_PROMPTS.findIndex((item) => item.id === task1Prompt.id) + 1;
  const task2Index = TASK2_PROMPTS.findIndex((item) => item.id === task2Prompt.id) + 1;

  elements.task1PromptCard.innerHTML = `
    <div class="prompt-meta">
      <span class="tag">${escapeHtml(task1Prompt.type)}</span>
      <span class="tag">Prompt ${task1Index}/${TASK1_PROMPTS.length}</span>
      <span>#${escapeHtml(task1Prompt.id)}</span>
    </div>
    <h3>${escapeHtml(task1Prompt.title)}</h3>
    <p>${escapeHtml(task1Prompt.prompt)}</p>
    <div class="prompt-visual">
      ${renderTask1Visual(task1Prompt.visual)}
      <div class="prompt-visual-caption">本地示意圖會隨題目切換，讓你更接近 IELTS Task 1 的圖像閱讀方式。</div>
    </div>
  `;

  elements.task2PromptCard.innerHTML = `
    <div class="prompt-meta">
      <span class="tag">${escapeHtml(task2Prompt.mode || "Argument Essay")}</span>
      <span class="tag">Prompt ${task2Index}/${TASK2_PROMPTS.length}</span>
      <span>#${escapeHtml(task2Prompt.id)}</span>
    </div>
    <h3>${escapeHtml(task2Prompt.title)}</h3>
    <p>${escapeHtml(task2Prompt.prompt)}</p>
  `;
}

function renderDashboardStats() {
  const task1Prompt = getCurrentTask1Prompt();
  const task2Prompt = getCurrentTask2Prompt();
  elements.task1BankSize.textContent = `${TASK1_PROMPTS.length} 題`;
  elements.task2BankSize.textContent = `${TASK2_PROMPTS.length} 題`;
  elements.currentTask1Type.textContent = task1Prompt.type;
  elements.currentTask1Title.textContent = task1Prompt.title;
  elements.currentTask2Title.textContent = task2Prompt.title;
  elements.currentTask2Mode.textContent = task2Prompt.mode || "Argument Essay";
}

function resetTask1Session() {
  TASK1_SECTION_KEYS.forEach((key) => {
    state.draft[key] = "";
  });
  state.latestResult = null;
}

function resetTask2Draft() {
  state.draft.task2Essay = "";
  elements.task2Essay.value = "";
}

async function refreshAiStatus() {
  try {
    const response = await fetch("/api/health", {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      return;
    }

    const payload = await response.json();
    runtime.ai.available = true;
    runtime.ai.configured = Boolean(payload.ai_configured);
    runtime.ai.model = payload.model || "gpt-5.2";
    runtime.ai.reasoningEffort = payload.reasoning_effort || "high";
  } catch (error) {
    runtime.ai.available = false;
  }
}

function renderWritingFlow() {
  const prompt = getCurrentTask1Prompt();

  elements.task1Flow.innerHTML = WRITING_FLOW.map((step, index) => {
    const value = state.draft[step.key] || "";
    const starters = step.starters(prompt)
      .filter(Boolean)
      .slice(0, 3);

    return `
      <section class="field-card flow-step">
        <div class="step-index">${index + 1}</div>
        <div class="field-topline">
          <span>${escapeHtml(step.label)}</span>
          <span class="field-subtitle">${escapeHtml(step.subtitle)}</span>
        </div>
        <div class="starter-bank">
          ${starters
            .map(
              (starter) => `
                <button
                  type="button"
                  class="starter-chip"
                  data-target-key="${escapeAttribute(step.key)}"
                  data-insert-text="${escapeAttribute(starter)}"
                >
                  ${escapeHtml(trimStarterLabel(starter))}
                </button>
              `,
            )
            .join("")}
        </div>
        <textarea
          data-section-key="${escapeAttribute(step.key)}"
          rows="${step.key.startsWith("body") ? 3 : 2}"
          placeholder="${escapeAttribute(step.placeholder)}"
        >${escapeHtml(value)}</textarea>
      </section>
    `;
  }).join("");
}

function renderTask2Lock() {
  elements.task2Status.textContent = state.task2Unlocked ? "已解鎖" : "尚未解鎖";
  elements.task2LockHint.textContent = state.task2Unlocked ? "Task 2 已可練習" : "完成 Task 1 後解鎖";
  elements.task2LockHint.classList.toggle("locked", !state.task2Unlocked);
  elements.task2Tab.disabled = !state.task2Unlocked;
  elements.task2Essay.disabled = !state.task2Unlocked;
}

function activateTab(tabName) {
  elements.tabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });

  elements.panels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === tabName);
  });
}

function updatePreview(scrollIntoView = false) {
  const preview = composeEssayFromDraft();
  const wordCount = countWords(preview);
  elements.liveWordCount.textContent = `${wordCount} words`;
  elements.task1PreviewMeta.textContent = `${wordCount} words`;
  elements.task1Preview.textContent = preview || "你的完整文章會在這裡即時組合。";
  elements.task1Preview.classList.toggle("empty-state", !preview);

  if (scrollIntoView) {
    elements.task1Preview.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function composeEssayFromDraft() {
  return TASK1_SECTION_KEYS.map((key) => sanitizeText(state.draft[key]))
    .filter(Boolean)
    .join("\n\n");
}

function updateReminderLabel() {
  if (!state.reminderEnabled) {
    elements.nextReminder.textContent = "提醒已關閉";
    return;
  }

  elements.nextReminder.textContent = getNextReminderText();
}

function getNextReminderText() {
  const [hours, minutes] = (state.reminderTime || "17:00").split(":").map(Number);
  const now = new Date();
  const next = new Date();
  next.setHours(hours, minutes, 0, 0);
  if (next <= now) {
    next.setDate(next.getDate() + 1);
  }
  return `${next.toLocaleDateString("zh-TW")} ${state.reminderTime}`;
}

function checkReminder(now) {
  if (!state.reminderEnabled) {
    return;
  }

  const [hours, minutes] = (state.reminderTime || "17:00").split(":").map(Number);
  const todayKey = formatDateKey(now);
  if (state.lastReminderDate === todayKey) {
    return;
  }

  if (now.getHours() === hours && now.getMinutes() === minutes) {
    state.lastReminderDate = todayKey;
    saveState();
    openReminderModal(false);
  }
}

function openReminderModal(isTest) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(isTest ? "IELTS Writing 測試提醒" : "IELTS Writing 練習時間到了", {
      body: "先完成一篇 Task 1，再解鎖 Task 2 練習。",
    });
  }

  if (!elements.reminderDialog.open) {
    elements.reminderDialog.showModal();
  }
}

async function scoreCurrentTask1() {
  const prompt = getCurrentTask1Prompt();
  const draft = { ...state.draft };
  const essay = composeEssayFromDraft();
  const originalLabel = elements.scoreTask1.textContent;
  elements.scoreTask1.disabled = true;
  elements.scoreTask1.textContent = runtime.ai.configured ? "AI 批改中..." : "批改中...";

  let result;
  try {
    if (runtime.ai.available && runtime.ai.configured) {
      const aiPayload = await gradeWithBackend(prompt, draft, essay);
      result = normalizeAiResult(aiPayload, prompt, draft);
    } else {
      result = evaluateTask1(prompt, draft, essay);
      result.gradingMode = runtime.ai.available
        ? "Local rules fallback · OPENAI_API_KEY 未設定"
        : "Local rules fallback · backend unavailable";
    }
  } catch (error) {
    result = evaluateTask1(prompt, draft, essay);
    result.gradingMode = `Local rules fallback · ${error.message || "AI grading failed"}`;
  } finally {
    elements.scoreTask1.disabled = false;
    elements.scoreTask1.textContent = originalLabel;
  }

  state.latestResult = result;
  state.task2Unlocked = true;
  saveState();

  renderTask2Lock();
  renderLatestResult();
  populateFilters();
  renderCorrectionCards();
  openResultDialog(result);

  if (state.ankiAutoDownload) {
    downloadAnkiExport();
  }
}

async function gradeWithBackend(prompt, draft, essay) {
  const response = await fetch("/api/grade", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      prompt,
      draft,
      essay,
      sections: WRITING_FLOW.map((step) => ({
        sectionKey: step.key,
        sectionLabel: step.label,
        originalText: draft[step.key] || "",
      })),
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "AI grading request failed");
  }

  return payload;
}

function normalizeAiResult(aiPayload, prompt, draft) {
  const rewriteMap = new Map(
    (aiPayload.rewrites || []).map((item) => [item.sectionKey, normalizeEssaySentence(item.newText || "")]),
  );

  const sectionRewrites = WRITING_FLOW.map((step) => {
    const original = sanitizeText(draft[step.key]);
    const newText = rewriteMap.get(step.key) || improveSectionText(step.key, original, prompt);
    return {
      sectionKey: step.key,
      sectionLabel: step.label,
      oldText: original || "未填寫",
      newText,
      diffHtml: buildDiffHtml(original || "未填寫", newText),
    };
  });

  const issues = (aiPayload.issues || []).map((issue) => ({
    type: issue.type || "AI Feedback",
    section: issue.section || "全文",
    title: issue.title || "待調整",
    reason: issue.reason || "",
    advice: issue.advice || "",
  }));

  const correctionCards = buildCorrectionCards(sectionRewrites, issues);
  const ankiRows = buildAnkiRows(correctionCards);
  const prioritiesText = Array.isArray(aiPayload.analysis?.priorities)
    ? aiPayload.analysis.priorities
        .map((item, index) => `${index + 1}. ${item}`)
        .join("\n")
    : sanitizeText(aiPayload.analysis?.priorities || "");

  return {
    createdAt: aiPayload.createdAt || new Date().toISOString(),
    promptId: prompt.id,
    promptTitle: prompt.title,
    promptType: prompt.type,
    overallBand: Number(aiPayload.overallBand || 6.0),
    gradingMode: `AI · ${aiPayload.model || runtime.ai.model} · reasoning ${aiPayload.reasoningEffort || runtime.ai.reasoningEffort}`,
    scores: {
      taskAchievement: Number(aiPayload.scores?.taskAchievement || 6.0),
      coherence: Number(aiPayload.scores?.coherence || 6.0),
      lexical: Number(aiPayload.scores?.lexical || 6.0),
      grammar: Number(aiPayload.scores?.grammar || 6.0),
    },
    analysis: {
      headline: aiPayload.analysis?.headline || `預估 Band Score：${Number(aiPayload.overallBand || 6.0).toFixed(1)}`,
      reason: aiPayload.analysis?.reason || "AI 已完成 Task 1 批改。",
      strengths: aiPayload.analysis?.strengths || "AI 已依據題目、結構與語言品質給出修正方向。",
      priorities: prioritiesText,
      descriptors: [
        { label: "Task Achievement", value: Number(aiPayload.scores?.taskAchievement || 6.0).toFixed(1) },
        { label: "Coherence & Cohesion", value: Number(aiPayload.scores?.coherence || 6.0).toFixed(1) },
        { label: "Lexical Resource", value: Number(aiPayload.scores?.lexical || 6.0).toFixed(1) },
        { label: "Grammar Range & Accuracy", value: Number(aiPayload.scores?.grammar || 6.0).toFixed(1) },
      ],
    },
    issues,
    correctionCards,
    sectionRewrites,
    ankiRows,
  };
}

function evaluateTask1(prompt, draft, essay) {
  const wordCount = countWords(essay);
  const filledSections = TASK1_SECTION_KEYS.filter((key) => sanitizeText(draft[key])).length;
  const completionRatio = filledSections / TASK1_SECTION_KEYS.length;
  const uniqueRatio = calcUniqueRatio(essay);
  const punctuationPenalty = countPunctuationIssues(draft);
  const missingOverview = !sanitizeText(draft.overall);
  const overviewHasFigures = /\d/.test(`${draft.overall || ""} ${draft.overall2 || ""}`);
  const bodyMainCount = ["body1Main", "body2Main"].filter((key) => sanitizeText(draft[key])).length;
  const detailCount = [
    "body1Detail1",
    "body1Detail2",
    "body2Detail1",
    "body2Detail2",
  ].filter((key) => sanitizeText(draft[key])).length;

  let taskAchievement = 4.5 + completionRatio * 2.3;
  taskAchievement += wordCount >= 150 ? 1.2 : Math.max(0, wordCount / 150);
  taskAchievement += missingOverview ? -0.9 : 0.4;
  taskAchievement += bodyMainCount === 2 ? 0.4 : 0;
  taskAchievement -= overviewHasFigures ? 0.3 : 0;

  let coherence = 4.7 + completionRatio * 1.7 + detailCount * 0.14;
  coherence += paragraphBalanceBonus(draft);
  coherence -= punctuationPenalty * 0.15;

  let lexical = 4.7 + uniqueRatio * 2.5 + lexicalUpgradeCount(essay) * 0.12;
  lexical -= repeatedSimpleWordPenalty(essay);

  let grammar = 4.8 + sentenceControlBonus(draft) + capitalizationBonus(draft);
  grammar -= punctuationPenalty * 0.2;

  taskAchievement = clampToBand(taskAchievement);
  coherence = clampToBand(coherence);
  lexical = clampToBand(lexical);
  grammar = clampToBand(grammar);

  const overallBand = roundHalf((taskAchievement + coherence + lexical + grammar) / 4);
  const issues = buildIssueList({
    draft,
    essay,
    wordCount,
    missingOverview,
    overviewHasFigures,
    bodyMainCount,
    detailCount,
    punctuationPenalty,
    uniqueRatio,
  });
  const sectionRewrites = buildSectionRewrites(prompt, draft);
  const correctionCards = buildCorrectionCards(sectionRewrites, issues);
  const ankiRows = buildAnkiRows(correctionCards);
  const analysis = buildChineseAnalysis({
    overallBand,
    wordCount,
    taskAchievement,
    coherence,
    lexical,
    grammar,
    issues,
  });

  return {
    createdAt: new Date().toISOString(),
    promptId: prompt.id,
    promptTitle: prompt.title,
    promptType: prompt.type,
    gradingMode: "Local rules",
    overallBand,
    scores: {
      taskAchievement,
      coherence,
      lexical,
      grammar,
    },
    analysis,
    issues,
    correctionCards,
    sectionRewrites,
    ankiRows,
  };
}

function buildIssueList(context) {
  const issues = [];

  if (context.wordCount < 150) {
    issues.push({
      type: "Task Response",
      section: "全文",
      title: "字數不足",
      reason: `目前只有 ${context.wordCount} 字，Task 1 至少要 150 字，否則內容發展會不夠完整。`,
      advice: "先把兩段 body 的數據寫滿，每段至少補兩個比較或數字。",
    });
  }

  if (context.missingOverview) {
    issues.push({
      type: "Overview",
      section: "2. Overview Sentence 1",
      title: "缺少總覽句",
      reason: "Task 1 的 overview 是高分關鍵，如果沒有這一段，Task Achievement 很難拉高。",
      advice: "先寫最大趨勢、最高最低或最明顯差異，先不要塞細節數字。",
    });
  }

  if (context.overviewHasFigures) {
    issues.push({
      type: "Overview",
      section: "Overview",
      title: "Overview 放了太多數字",
      reason: "Overview 應先總結趨勢；如果一開始就塞進太多 figures，整體層次會變得不清楚。",
      advice: "把具體數字移到 body paragraphs，overview 只保留 overall trend。",
    });
  }

  if (context.bodyMainCount < 2) {
    issues.push({
      type: "Organization",
      section: "Body Paragraphs",
      title: "兩段主體還沒有明確分組",
      reason: "目前兩個主體段的 topic sentence 不夠清楚，讀者不容易看出你如何分類資訊。",
      advice: "先決定分組方式，例如高低兩組、前後兩時期、上升與下降兩類。",
    });
  }

  if (context.detailCount < 3) {
    issues.push({
      type: "Development",
      section: "Details",
      title: "細節支撐不足",
      reason: "主體段後面的數據與比較句還不夠，文章會像只有骨架、沒有內容。",
      advice: "每個 body 至少放兩個數字、排名、倍數或對照關係。",
    });
  }

  if (context.punctuationPenalty > 0) {
    issues.push({
      type: "Grammar",
      section: "Sentence Control",
      title: "句尾與句界不夠穩定",
      reason: "有些框框裡的句子沒有完整收尾，會讓文法準確度與可讀性一起下降。",
      advice: "每格先寫成完整英文句子，句尾加句號，避免片段式筆記語言。",
    });
  }

  if (context.uniqueRatio < 0.45) {
    issues.push({
      type: "Lexical Resource",
      section: "Word Choice",
      title: "字彙變化偏少",
      reason: "重複使用太多簡單動詞與形容詞，詞彙資源還不夠像 Band 7 左右的寫法。",
      advice: "交替使用 rose, fell, remained, accounted for, proportion, respectively, whereas 等正式表達。",
    });
  }

  if (issues.length === 0) {
    issues.push({
      type: "Strength",
      section: "全文",
      title: "結構完整",
      reason: "文章已具備 introduction, overview 與兩段 body 的基礎框架。",
      advice: "下一步是讓比較語言更自然，並把 figures 和趨勢綁得更緊。",
    });
  }

  return issues;
}

function buildSectionRewrites(prompt, draft) {
  return WRITING_FLOW.map((step) => {
    const original = sanitizeText(draft[step.key]);
    const improved = improveSectionText(step.key, original, prompt);
    return {
      sectionKey: step.key,
      sectionLabel: step.label,
      oldText: original || "未填寫",
      newText: improved,
      diffHtml: buildDiffHtml(original || "未填寫", improved),
    };
  });
}

function improveSectionText(sectionKey, original, prompt) {
  const fallbackMap = {
    restatement: prompt.restatement,
    overall: prompt.overview,
    overall2: prompt.overview2,
    body1Main: prompt.focusA,
    body1Detail1: "This figure rose from ... to ..., making it clearly higher than the corresponding value for the other category.",
    body1Detail2: "Meanwhile, the second figure was lower and changed more gradually over the same period.",
    body2Main: prompt.focusB,
    body2Detail1: "By comparison, the remaining category stayed below the leading figure throughout the period.",
    body2Detail2: "Taken together, these figures suggest that the ranking remained broadly stable despite some changes.",
  };

  if (!original) {
    return fallbackMap[sectionKey];
  }

  let text = normalizeEssaySentence(original);
  const replacements = [
    ["a lot of", "a substantial amount of"],
    ["many", "a considerable number of"],
    ["more and more", "an increasing number of"],
    ["very", "markedly"],
    ["big", "significant"],
    ["small", "modest"],
    ["shows", "illustrates"],
    ["shows that", "indicates that"],
    ["goes up", "rises"],
    ["go up", "rise"],
    ["goes down", "falls"],
    ["go down", "fall"],
  ];

  replacements.forEach(([from, to]) => {
    text = replaceCaseInsensitive(text, from, to);
  });

  if (sectionKey === "restatement") {
    text = mergeWithTemplate(text, prompt.restatement);
  }

  if (sectionKey === "overall" || sectionKey === "overall2") {
    text = prependIfMissing(text, sectionKey === "overall" ? "Overall," : "In general,");
    if (!containsAny(text, ["overall", "highest", "lowest", "increase", "decrease", "remain"])) {
      text = `${text} ${sectionKey === "overall" ? prompt.overview : prompt.overview2}`;
    }
  }

  if (sectionKey === "body1Main") {
    text = injectSupportivePhrase(text, prompt.focusA);
  }

  if (sectionKey === "body2Main") {
    text = injectSupportivePhrase(text, prompt.focusB);
  }

  return normalizeEssaySentence(text);
}

function buildCorrectionCards(sectionRewrites, issues) {
  const rewriteCards = sectionRewrites.map((item) => ({
    type: "Rewrite",
    section: item.sectionLabel,
    title: `${item.sectionLabel} 改寫`,
    oldText: item.oldText,
    newText: item.newText,
    explanation: "保留原意後改成更接近 IELTS Task 1 正式書面語的寫法。",
    diffHtml: item.diffHtml,
  }));

  const issueCards = issues.map((issue) => ({
    type: issue.type,
    section: issue.section,
    title: issue.title,
    oldText: issue.reason,
    newText: issue.advice,
    explanation: "這是本地規則引擎抓出的優先修正點。",
    diffHtml: `<span class="diff-del">${escapeHtml(issue.reason)}</span><br /><span class="diff-add">${escapeHtml(issue.advice)}</span>`,
  }));

  return [...rewriteCards, ...issueCards];
}

function buildAnkiRows(cards) {
  return cards.map((card) => {
    const front = `[${card.section}] ${stripHtml(card.oldText).trim() || card.title}`;
    const back = `${stripHtml(card.newText).trim()}\n\n說明：${card.explanation}`;
    const tags = ["ielts-writing", sanitizeTag(card.section), sanitizeTag(card.type)]
      .filter(Boolean)
      .join(" ");
    return [front, back, tags].join("\t");
  });
}

function buildChineseAnalysis({ overallBand, wordCount, taskAchievement, coherence, lexical, grammar, issues }) {
  const headline = `預估 Band Score：${overallBand.toFixed(1)}`;
  const reason = `這次估分是依照本地規則引擎，根據字數、overview 是否完整、主體分組、細節支撐與句子控制做出的近似判斷。全文約 ${wordCount} 字。`;
  const strengths = issues
    .filter((issue) => issue.type === "Strength")
    .map((issue) => `優點：${issue.reason}`)
    .join(" ");
  const priorities = issues
    .filter((issue) => issue.type !== "Strength")
    .slice(0, 3)
    .map((issue, index) => `${index + 1}. ${issue.title}：${issue.advice}`)
    .join("\n");

  return {
    headline,
    reason,
    strengths: strengths || "目前最值得先拉高的，通常是 overview 與兩段 body 的分組清楚度。",
    priorities,
    descriptors: [
      { label: "Task Achievement", value: taskAchievement.toFixed(1) },
      { label: "Coherence & Cohesion", value: coherence.toFixed(1) },
      { label: "Lexical Resource", value: lexical.toFixed(1) },
      { label: "Grammar Range & Accuracy", value: grammar.toFixed(1) },
    ],
  };
}

function renderLatestResult() {
  const result = state.latestResult;
  if (!result) {
    elements.scoreSummary.innerHTML = "送出 Task 1 後，這裡會顯示 Band Score、中文分析與修改建議。";
    elements.scoreSummary.classList.add("empty-state");
    elements.lastScoreTime.textContent = "尚未評分";
    elements.ankiExport.value = "";
    elements.downloadAnki.disabled = true;
    renderCorrectionCards();
    return;
  }

  elements.scoreSummary.classList.remove("empty-state");
  elements.lastScoreTime.textContent = new Date(result.createdAt).toLocaleString("zh-TW");
  elements.scoreSummary.innerHTML = `
    <div class="band-chip">Band ${result.overallBand.toFixed(1)} · ${escapeHtml(result.promptType)}</div>
    <p><strong>批改來源：</strong>${escapeHtml(result.gradingMode || "Local rules")}</p>
    <p>${escapeHtml(result.analysis.reason)}</p>
    <div class="score-grid">
      ${result.analysis.descriptors
        .map(
          (item) => `
            <div class="score-box">
              <span>${escapeHtml(item.label)}</span>
              <strong>${escapeHtml(item.value)}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
    <p><strong>優先調整：</strong><br />${escapeHtml(result.analysis.priorities).replace(/\n/g, "<br />")}</p>
  `;

  elements.ankiExport.value = result.ankiRows.join("\n");
  elements.downloadAnki.disabled = false;
  renderCorrectionCards();
}

function openResultDialog(result) {
  const comparisonRows = result.sectionRewrites
    .map(
      (item) => `
        <div class="comparison-row">
          <div class="card-labels">
            <span class="pill">${escapeHtml(item.sectionLabel)}</span>
            <span class="pill">${escapeHtml(result.promptType)}</span>
          </div>
          <div class="diff-line">${item.diffHtml}</div>
        </div>
      `,
    )
    .join("");

  const issueRows = result.issues
    .map(
      (issue) => `
        <li><strong>${escapeHtml(issue.title)}</strong>：${escapeHtml(issue.reason)} 建議：${escapeHtml(issue.advice)}</li>
      `,
    )
    .join("");

  const bandEssay = result.sectionRewrites.map((item) => item.newText).join("\n\n");

  elements.resultDialogContent.innerHTML = `
    <div class="dialog-summary">
      <section class="dialog-section">
        <div class="band-chip">${escapeHtml(result.analysis.headline)}</div>
        <p><strong>批改來源：</strong>${escapeHtml(result.gradingMode || "Local rules")}</p>
        <p>${escapeHtml(result.analysis.reason)}</p>
        <p>${escapeHtml(result.analysis.strengths)}</p>
      </section>
      <section class="dialog-section">
        <h3>中文評語與修正方向</h3>
        <ul>${issueRows}</ul>
      </section>
      <section class="dialog-section">
        <h3>逐區塊改寫對比</h3>
        <div class="comparison-grid">${comparisonRows}</div>
      </section>
      <section class="dialog-section">
        <h3>Band 7.5 參考範本</h3>
        <div class="preview-body">${escapeHtml(bandEssay)}</div>
      </section>
    </div>
  `;

  if (!elements.resultDialog.open) {
    elements.resultDialog.showModal();
  }
}

function populateFilters() {
  const result = state.latestResult;
  const sectionValues = new Set(["all"]);
  const typeValues = new Set(["all"]);

  if (result) {
    result.correctionCards.forEach((card) => {
      sectionValues.add(card.section);
      typeValues.add(card.type);
    });
  }

  elements.filterSection.innerHTML = Array.from(sectionValues)
    .map((value) => `<option value="${escapeAttribute(value)}">${escapeHtml(value === "all" ? "全部區塊" : value)}</option>`)
    .join("");

  elements.filterType.innerHTML = Array.from(typeValues)
    .map((value) => `<option value="${escapeAttribute(value)}">${escapeHtml(value === "all" ? "全部類型" : value)}</option>`)
    .join("");
}

function renderCorrectionCards() {
  const result = state.latestResult;
  if (!result) {
    elements.correctionCards.textContent = "這裡會顯示可篩選的錯誤與改寫卡片。";
    elements.correctionCards.classList.add("empty-state");
    return;
  }

  const sectionFilter = elements.filterSection.value || "all";
  const typeFilter = elements.filterType.value || "all";
  const cards = result.correctionCards.filter((card) => {
    const matchesSection = sectionFilter === "all" || card.section === sectionFilter;
    const matchesType = typeFilter === "all" || card.type === typeFilter;
    return matchesSection && matchesType;
  });

  if (!cards.length) {
    elements.correctionCards.innerHTML = "目前的篩選條件沒有結果。";
    elements.correctionCards.classList.add("empty-state");
    return;
  }

  elements.correctionCards.classList.remove("empty-state");
  elements.correctionCards.innerHTML = cards
    .map(
      (card) => `
        <article class="correction-card">
          <div class="card-labels">
            <span class="pill">${escapeHtml(card.section)}</span>
            <span class="pill">${escapeHtml(card.type)}</span>
          </div>
          <h3>${escapeHtml(card.title)}</h3>
          <div class="diff-line">${card.diffHtml}</div>
          <p>${escapeHtml(card.explanation)}</p>
        </article>
      `,
    )
    .join("");
}

function downloadAnkiExport() {
  const result = state.latestResult;
  if (!result || !result.ankiRows.length) {
    return;
  }

  const blob = new Blob([result.ankiRows.join("\n")], {
    type: "text/tab-separated-values;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `ielts-writing-anki-${formatDateKey(new Date())}.tsv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function renderTask1Visual(visual) {
  switch (visual.kind) {
    case "bar":
      return renderBarChart(visual);
    case "line":
      return renderLineChart(visual);
    case "pies":
      return renderPieCharts(visual);
    case "mapCompare":
      return renderMapCompare(visual);
    case "table":
      return renderVisualTable(visual);
    case "process":
      return renderProcessDiagram(visual);
    case "mixed":
      return `
        <div>${renderBarChart(visual.bar)}</div>
        <div style="margin-top: 12px;">${renderPieChartBlock(visual.pie.title, visual.pie.values)}</div>
      `;
    default:
      return "";
  }
}

function renderBarChart(chart) {
  const width = 520;
  const height = 240;
  const maxValue = Math.max(...chart.series.flatMap((item) => item.values));
  const plotHeight = 150;
  const plotWidth = 410;
  const left = 60;
  const bottom = 36;
  const baseY = height - bottom;
  const groupWidth = plotWidth / chart.categories.length;
  const barWidth = Math.min(28, groupWidth / (chart.series.length + 1));

  const bars = chart.categories
    .map((category, categoryIndex) => {
      const seriesBars = chart.series
        .map((series, seriesIndex) => {
          const value = series.values[categoryIndex];
          const barHeight = (value / maxValue) * plotHeight;
          const x = left + categoryIndex * groupWidth + 10 + seriesIndex * (barWidth + 8);
          const y = baseY - barHeight;
          return `
            <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="6" fill="${series.color}" />
            <text x="${x + barWidth / 2}" y="${y - 6}" text-anchor="middle" font-size="11" fill="#544237">${value}</text>
          `;
        })
        .join("");

      return `
        ${seriesBars}
        <text x="${left + categoryIndex * groupWidth + groupWidth / 2}" y="${height - 12}" text-anchor="middle" font-size="12" fill="#6f5d4d">${escapeHtml(category)}</text>
      `;
    })
    .join("");

  const legend = chart.series
    .map(
      (series, index) => `
        <g transform="translate(${left + index * 110}, 12)">
          <rect width="14" height="14" rx="4" fill="${series.color}" />
          <text x="22" y="12" font-size="12" fill="#5f4d3f">${escapeHtml(series.label)}</text>
        </g>
      `,
    )
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Task 1 chart">
      <line x1="${left}" y1="${baseY}" x2="${left + plotWidth + 10}" y2="${baseY}" stroke="#cabaa7" stroke-width="2" />
      <line x1="${left}" y1="${baseY}" x2="${left}" y2="${baseY - plotHeight - 10}" stroke="#cabaa7" stroke-width="2" />
      ${[0, 0.25, 0.5, 0.75, 1]
        .map((step) => {
          const y = baseY - step * plotHeight;
          const value = Math.round(maxValue * step);
          return `
            <line x1="${left}" y1="${y}" x2="${left + plotWidth + 10}" y2="${y}" stroke="#efe3d5" />
            <text x="${left - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="#7c6a59">${value}</text>
          `;
        })
        .join("")}
      ${bars}
      ${legend}
      <text x="${width - 10}" y="${height - 12}" text-anchor="end" font-size="11" fill="#8a7763">${escapeHtml(chart.unit)}</text>
    </svg>
  `;
}

function renderLineChart(chart) {
  const width = 520;
  const height = 240;
  const left = 56;
  const top = 18;
  const plotWidth = 420;
  const plotHeight = 160;
  const maxValue = Math.max(...chart.series.flatMap((item) => item.values));
  const minValue = Math.min(...chart.series.flatMap((item) => item.values));

  const lines = chart.series
    .map((series) => {
      const points = series.values
        .map((value, index) => {
          const x = left + (index / (chart.labels.length - 1)) * plotWidth;
          const y = top + plotHeight - ((value - minValue) / (maxValue - minValue || 1)) * plotHeight;
          return `${x},${y}`;
        })
        .join(" ");

      const markers = series.values
        .map((value, index) => {
          const x = left + (index / (chart.labels.length - 1)) * plotWidth;
          const y = top + plotHeight - ((value - minValue) / (maxValue - minValue || 1)) * plotHeight;
          return `<circle cx="${x}" cy="${y}" r="4" fill="${series.color}" />`;
        })
        .join("");

      return `<polyline fill="none" stroke="${series.color}" stroke-width="3.5" points="${points}" />${markers}`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Task 1 chart">
      ${[0, 0.25, 0.5, 0.75, 1]
        .map((step) => {
          const y = top + plotHeight - step * plotHeight;
          const value = (minValue + (maxValue - minValue) * step).toFixed(0);
          return `
            <line x1="${left}" y1="${y}" x2="${left + plotWidth}" y2="${y}" stroke="#efe3d5" />
            <text x="${left - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="#7c6a59">${value}</text>
          `;
        })
        .join("")}
      ${chart.labels
        .map((label, index) => {
          const x = left + (index / (chart.labels.length - 1)) * plotWidth;
          return `<text x="${x}" y="${height - 16}" text-anchor="middle" font-size="11" fill="#6f5d4d">${escapeHtml(label)}</text>`;
        })
        .join("")}
      ${lines}
      ${chart.series
        .map(
          (series, index) => `
            <g transform="translate(${left + index * 120}, ${height - 234})">
              <rect width="14" height="14" rx="4" fill="${series.color}" />
              <text x="22" y="12" font-size="12" fill="#5f4d3f">${escapeHtml(series.label)}</text>
            </g>
          `,
        )
        .join("")}
      <text x="${width - 10}" y="${height - 16}" text-anchor="end" font-size="11" fill="#8a7763">${escapeHtml(chart.unit)}</text>
    </svg>
  `;
}

function renderPieCharts(config) {
  return `
    <div>
      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px;">
        ${config.pies.map((pie) => renderPieChartBlock(pie.title, pie.values)).join("")}
      </div>
      <div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 10px;">
        ${config.pies[0].values
          .map(
            (item) => `
              <span class="pill" style="background:${item.color}22; color:#4c4036;">
                <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${item.color};margin-right:6px;"></span>
                ${escapeHtml(item.label)}
              </span>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderPieChartBlock(title, values) {
  const total = values.reduce((sum, item) => sum + item.value, 0);
  let progress = 0;
  const segments = values
    .map((item) => {
      const start = (progress / total) * 360;
      progress += item.value;
      const end = (progress / total) * 360;
      return `${item.color} ${start}deg ${end}deg`;
    })
    .join(", ");

  return `
    <div style="border:1px solid rgba(46,36,28,0.08);border-radius:16px;padding:12px;">
      <div style="font-weight:700;margin-bottom:10px;">${escapeHtml(title)}</div>
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="width:120px;height:120px;border-radius:50%;background:conic-gradient(${segments});flex:none;"></div>
        <div style="display:grid;gap:6px;font-size:12px;color:#6d5b4c;">
          ${values.map((item) => `<div>${escapeHtml(item.label)}: ${item.value}%</div>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderMapCompare(config) {
  const panelWidth = 250;
  const panelHeight = 140;
  return `
    <svg viewBox="0 0 540 170" role="img" aria-label="Task 1 map">
      ${config.panels
        .map((panel, panelIndex) => {
          const offset = panelIndex * 270;
          return `
            <g transform="translate(${offset}, 0)">
              <rect x="10" y="16" width="${panelWidth}" height="${panelHeight}" rx="18" fill="#fff8f1" stroke="#decdbb" />
              <text x="20" y="36" font-size="13" fill="#604d3f" font-weight="700">${escapeHtml(panel.title)}</text>
              ${panel.items
                .map(
                  (item) => `
                    <rect x="${item.x}" y="${item.y + 18}" width="${item.w}" height="${item.h}" rx="10" fill="${item.color}" opacity="0.94" />
                    <text x="${item.x + item.w / 2}" y="${item.y + item.h / 2 + 22}" text-anchor="middle" font-size="10" fill="#fffdf8">${escapeHtml(item.label)}</text>
                  `,
                )
                .join("")}
            </g>
          `;
        })
        .join("")}
    </svg>
  `;
}

function renderVisualTable(config) {
  return `
    <table class="visual-table" role="img" aria-label="Task 1 table">
      <thead>
        <tr>${config.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${config.rows
          .map(
            (row) => `
              <tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>
            `,
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderProcessDiagram(config) {
  const boxWidth = 96;
  const gap = 12;
  return `
    <svg viewBox="0 0 760 120" role="img" aria-label="Task 1 process diagram">
      ${config.steps
        .map((step, index) => {
          const x = 12 + index * (boxWidth + gap);
          const arrow = index < config.steps.length - 1
            ? `<path d="M ${x + boxWidth + 4} 56 H ${x + boxWidth + gap - 6}" stroke="#bcab97" stroke-width="3" fill="none" />
               <path d="M ${x + boxWidth + gap - 10} 48 L ${x + boxWidth + gap - 2} 56 L ${x + boxWidth + gap - 10} 64" stroke="#bcab97" stroke-width="3" fill="none" />`
            : "";
          return `
            <rect x="${x}" y="28" width="${boxWidth}" height="56" rx="16" fill="#fff8f1" stroke="#d7c6b6" />
            <text x="${x + boxWidth / 2}" y="60" text-anchor="middle" font-size="12" fill="#5d4b3d">${escapeHtml(step)}</text>
            ${arrow}
          `;
        })
        .join("")}
    </svg>
  `;
}

function loadState() {
  const nextState = readStorage(STORAGE_KEY) || readStorage(LEGACY_STORAGE_KEY);
  if (!nextState) {
    return structuredClone(DEFAULT_STATE);
  }

  return {
    ...structuredClone(DEFAULT_STATE),
    ...nextState,
    draft: migrateDraft(nextState.draft || {}),
  };
}

function readStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch (error) {
    return null;
  }
}

function migrateDraft(rawDraft) {
  return {
    ...DEFAULT_DRAFT,
    restatement: rawDraft.restatement || "",
    overall: rawDraft.overall || "",
    overall2: rawDraft.overall2 || "",
    body1Main: rawDraft.body1Main || rawDraft["body1-main"] || "",
    body1Detail1: rawDraft.body1Detail1 || rawDraft["body1-support1"] || "",
    body1Detail2: rawDraft.body1Detail2 || rawDraft["body1-support2"] || "",
    body2Main: rawDraft.body2Main || rawDraft["body2-main"] || "",
    body2Detail1: rawDraft.body2Detail1 || rawDraft["body2-support1"] || "",
    body2Detail2: rawDraft.body2Detail2 || rawDraft["body2-support2"] || "",
    task2Essay: rawDraft.task2Essay || "",
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getCurrentTask1Prompt() {
  return TASK1_PROMPTS.find((item) => item.id === state.currentTask1Id) || TASK1_PROMPTS[0];
}

function getCurrentTask2Prompt() {
  return TASK2_PROMPTS.find((item) => item.id === state.currentTask2Id) || TASK2_PROMPTS[0];
}

function pickRandom(pool, currentId) {
  const available = pool.filter((item) => item.id !== currentId);
  return available[Math.floor(Math.random() * available.length)] || pool[0];
}

function mergeStarterText(existing, starter) {
  const cleanExisting = existing.trim();
  const cleanStarter = starter.trim();
  if (!cleanExisting) {
    return cleanStarter;
  }
  if (cleanExisting.includes(cleanStarter)) {
    return cleanExisting;
  }
  return `${cleanExisting} ${cleanStarter}`;
}

function trimStarterLabel(text) {
  return text.length > 54 ? `${text.slice(0, 54)}...` : text;
}

function countWords(text) {
  if (!text) {
    return 0;
  }

  return text.trim().split(/\s+/).filter(Boolean).length;
}

function calcUniqueRatio(text) {
  const words = text.toLowerCase().match(/[a-z]+/g);
  if (!words || !words.length) {
    return 0;
  }
  return new Set(words).size / words.length;
}

function countPunctuationIssues(draft) {
  return TASK1_SECTION_KEYS.reduce((total, key) => {
    const text = sanitizeText(draft[key]);
    if (!text) {
      return total;
    }
    return /[.!?]$/.test(text) ? total : total + 1;
  }, 0);
}

function paragraphBalanceBonus(draft) {
  const lengthA = countWords([draft.body1Main, draft.body1Detail1, draft.body1Detail2].join(" "));
  const lengthB = countWords([draft.body2Main, draft.body2Detail1, draft.body2Detail2].join(" "));

  if (!lengthA || !lengthB) {
    return 0;
  }

  const gap = Math.abs(lengthA - lengthB);
  if (gap <= 12) {
    return 0.5;
  }
  if (gap <= 24) {
    return 0.25;
  }
  return 0;
}

function lexicalUpgradeCount(text) {
  return ["whereas", "respectively", "accounted for", "proportion", "rose", "fell", "remained"]
    .filter((token) => text.toLowerCase().includes(token))
    .length;
}

function repeatedSimpleWordPenalty(text) {
  const words = (text.toLowerCase().match(/[a-z]+/g) || []).filter((word) => word.length > 2);
  if (!words.length) {
    return 0;
  }

  const counts = new Map();
  words.forEach((word) => {
    counts.set(word, (counts.get(word) || 0) + 1);
  });

  let penalty = 0;
  ["good", "bad", "big", "small", "many", "shows"].forEach((word) => {
    if ((counts.get(word) || 0) >= 3) {
      penalty += 0.2;
    }
  });
  return penalty;
}

function sentenceControlBonus(draft) {
  return TASK1_SECTION_KEYS.reduce((total, key) => {
    const text = sanitizeText(draft[key]);
    if (!text) {
      return total;
    }
    return text.split(/\s+/).length >= 8 ? total + 0.18 : total;
  }, 0);
}

function capitalizationBonus(draft) {
  return TASK1_SECTION_KEYS.reduce((total, key) => {
    const text = sanitizeText(draft[key]);
    if (!text) {
      return total;
    }
    return /^[A-Z]/.test(text) ? total + 0.08 : total;
  }, 0);
}

function clampToBand(value) {
  return Math.min(8.5, Math.max(4.0, roundHalf(value)));
}

function roundHalf(value) {
  return Math.round(value * 2) / 2;
}

function sanitizeText(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

function normalizeEssaySentence(text) {
  const cleaned = sanitizeText(text)
    .replace(/\bi\b/g, "I")
    .replace(/\s+([,.!?;:])/g, "$1");

  if (!cleaned) {
    return "";
  }

  const withCapital = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return /[.!?]$/.test(withCapital) ? withCapital : `${withCapital}.`;
}

function replaceCaseInsensitive(text, from, to) {
  return text.replace(new RegExp(`\\b${escapeRegExp(from)}\\b`, "gi"), to);
}

function mergeWithTemplate(text, template) {
  if (containsAny(text, ["compare", "illustrate", "show", "present"])) {
    return text;
  }
  return `${template} ${text}`;
}

function prependIfMissing(text, prefix) {
  return text.toLowerCase().startsWith(prefix.toLowerCase()) ? text : `${prefix} ${text}`;
}

function containsAny(text, tokens) {
  const lowered = text.toLowerCase();
  return tokens.some((token) => lowered.includes(token.toLowerCase()));
}

function injectSupportivePhrase(text, fallback) {
  if (containsAny(text, ["higher", "lower", "increase", "decrease", "compare", "contrast", "rose", "fell"])) {
    return text;
  }
  return `${text} ${fallback}`;
}

function formatDateKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function buildDiffHtml(oldText, newText) {
  const oldTokens = tokenizeForDiff(oldText);
  const newTokens = tokenizeForDiff(newText);
  const diff = diffTokens(oldTokens, newTokens);
  return diff
    .map((part) => {
      const escaped = escapeHtml(part.value);
      if (part.type === "delete") {
        return `<span class="diff-del">${escaped}</span>`;
      }
      if (part.type === "add") {
        return `<span class="diff-add">${escaped}</span>`;
      }
      return `<span>${escaped}</span>`;
    })
    .join(" ");
}

function tokenizeForDiff(text) {
  return text.split(/\s+/).filter(Boolean);
}

function diffTokens(oldTokens, newTokens) {
  const dp = Array.from({ length: oldTokens.length + 1 }, () => Array(newTokens.length + 1).fill(0));

  for (let i = oldTokens.length - 1; i >= 0; i -= 1) {
    for (let j = newTokens.length - 1; j >= 0; j -= 1) {
      if (oldTokens[i] === newTokens[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  const result = [];
  let i = 0;
  let j = 0;

  while (i < oldTokens.length && j < newTokens.length) {
    if (oldTokens[i] === newTokens[j]) {
      result.push({ type: "same", value: oldTokens[i] });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      result.push({ type: "delete", value: oldTokens[i] });
      i += 1;
    } else {
      result.push({ type: "add", value: newTokens[j] });
      j += 1;
    }
  }

  while (i < oldTokens.length) {
    result.push({ type: "delete", value: oldTokens[i] });
    i += 1;
  }

  while (j < newTokens.length) {
    result.push({ type: "add", value: newTokens[j] });
    j += 1;
  }

  return result;
}

function stripHtml(text) {
  const div = document.createElement("div");
  div.innerHTML = text;
  return div.textContent || div.innerText || "";
}

function sanitizeTag(text) {
  const presetMap = {
    "1. Introduction": "introduction",
    "2. Overview Sentence 1": "overview-1",
    "3. Overview Sentence 2": "overview-2",
    "4. Body Paragraph 1 Topic": "body1-topic",
    "5. Body Paragraph 1 Detail A": "body1-detail-a",
    "6. Body Paragraph 1 Detail B": "body1-detail-b",
    "7. Body Paragraph 2 Topic": "body2-topic",
    "8. Body Paragraph 2 Detail A": "body2-detail-a",
    "9. Body Paragraph 2 Detail B": "body2-detail-b",
    全文: "full-essay",
    Overview: "overview",
    "2. Overview Sentence 1": "overview",
    "Body Paragraphs": "body-paragraphs",
    Details: "details",
    "Sentence Control": "sentence-control",
    "Word Choice": "word-choice",
  };

  if (presetMap[text]) {
    return presetMap[text];
  }

  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(text) {
  return escapeHtml(text);
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
