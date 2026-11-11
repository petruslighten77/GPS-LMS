// Materi Global Perspectives Grade 6 — diambil dari "Global Perspectives Grade 6 — Student WorkText" (sb, Nov 2026).
// Setiap blok: {t: tipe, ...}. Blok dengan `task` punya kotak jawaban yang dikumpulkan ke guru.
// Tipe: p, read, img, table, tool, skills, activity, video, think, dyk, local, action, list

const SKILLS = [
  { id: "research", name: "Research", icon: "🔍", desc: "Ask my own questions, plan how to find answers, use and record several sources" },
  { id: "analysis", name: "Analysis", icon: "🧩", desc: "Sort information, find causes and consequences, compare perspectives" },
  { id: "evaluation", name: "Evaluation", icon: "⚖️", desc: "Judge how useful and reliable a source is; notice opinion and bias" },
  { id: "reflection", name: "Reflection", icon: "🪞", desc: "Explain what I learned, how my view changed, and how well my team worked" },
  { id: "collaboration", name: "Collaboration", icon: "🤝", desc: "Share roles, listen, and work towards a team goal" },
  { id: "communication", name: "Communication", icon: "💬", desc: "Present ideas clearly in writing, talks, posters and reports" },
];

const THINKING_TOOLS = [
  ["KWL chart (Know / Want to know / Learned)", "Start and finish research"],
  ["5W1H", "Write good research questions"],
  ["Mind map", "Collect and group ideas"],
  ["Cause-and-consequence chain", "Show how one thing leads to another"],
  ["Fishbone diagram", "Find the many causes of one problem"],
  ["Perspectives wheel", "Compare how different people see an issue"],
  ["Fact / Opinion T-chart", "Separate facts from opinions"],
  ["Source checker (Who? When? Why? Evidence?)", "Judge how reliable a source is"],
  ["PMI (Plus / Minus / Interesting)", "Weigh up a solution"],
  ["Two Stars and a Wish", "Give and receive feedback"],
];

const UNITS = [
  // ───────────────────────────── UNIT 1
  {
    id: "u1", num: 1, title: "Looking after Planet Earth", color: "#2e9d5b",
    bigQuestion: "How can we reduce waste and protect the place we live?",
    image: "img/u1-before-after.jpg", skills: ["research", "analysis"],
    opener: "Look at the two pictures. What changed? Who do you think made the change?",
    goals: [
      "🔍 plan research questions and collect information from different sources",
      "🧩 sort information and explain causes and consequences of waste",
      "⚖️ compare different perspectives on plastic",
      "🤝 work in a team to carry out a school waste audit",
      "🪞 reflect on how my own habits and views have changed",
    ],
    wordBank: ["waste", "landfill", "recycle", "reduce", "reuse", "compost", "single-use", "pollution", "perspective", "consequence"],
    getStarted: {
      html: `<p>Look around your classroom. What will be thrown away by the end of today?</p>
<ol><li>In pairs, list 10 things that will become rubbish today.</li>
<li>Sort your list into three groups: food, plastic, paper and other.</li>
<li>Which group is the biggest? Why do you think so?</li></ol>
<p>Fill in the <b>KWL chart</b>. You will finish the last column at the end of the unit.</p>`,
      kwl: true, task: "u1-gs",
    },
    lessons: [
      {
        id: "u1-l1", code: "1.1", title: "What is waste?", blocks: [
          { t: "p", html: "Waste is anything we throw away because we think it is no longer useful. Some waste rots quickly, like banana peels. Some waste stays on Earth for hundreds of years, like plastic bottles." },
          { t: "read", title: "Rubbish in Our Country", html: `<p>Every day, families, schools, markets and shops in Indonesia throw things away. In 2024, more than 300 cities and regencies reported about 33 million tonnes of waste. That is heavier than 5 million elephants!</p>
<p>About half of all this rubbish comes from our homes. The biggest part is food waste: rice we do not finish, fruit skins and vegetables that go bad. The second biggest part is plastic, such as bottles, cups, straws and snack wrappers.</p>
<p>Food waste and plastic are very different. Food waste is <b>organic</b>: it rots and can become compost for plants in a few weeks. Plastic is <b>inorganic</b>: it does not rot and can stay in the ground or the sea for hundreds of years.</p>
<p>When we put all our rubbish into one bin, it is very hard to recycle. When we sort it first, food can become compost, and plastic, paper and cans can be recycled into new things.</p>` },
          { t: "img", src: "img/u1-sort-bins.jpg", caption: "Sort it before you throw it!" },
          { t: "table", title: "Source A: Indonesia's rubbish in numbers (2024)", head: ["Type of waste", "Share of all waste"], rows: [["Food waste", "about 39%"], ["Plastic", "about 20%"], ["Wood, branches, paper, metal, glass and others", "about 41%"]], note: "In 2024, more than 300 cities and regencies in Indonesia reported about 33 million tonnes of waste. (Source: SIPSN, Ministry of Environment, reported by ANTARA)" },
          { t: "activity", title: "Activity 1.1", task: "u1-l1-a", html: `<ol><li>Which type of waste is the biggest in Indonesia? Which is second?</li>
<li>Is this what you expected from your Get Started list? Why or why not?</li>
<li>Sort these items into organic and inorganic waste: rice, plastic straw, mango skin, can, newspaper, leaves, snack wrapper.</li></ol>` },
          { t: "skills", title: "Skills Focus: Reading a data table 🧩", html: `<ol><li>Read the title first: what is the table about?</li><li>Check the units (%, tonnes, years).</li><li>Find the biggest and smallest numbers.</li><li>Ask: What does this tell me? What does it NOT tell me?</li></ol>` },
          { t: "video", title: "Metro Community: Edukasi Pilah Sampah Sejak Dini di Sekolah (Metro TV, in Indonesian)", url: "https://www.metrotvnews.com/play/bmRCYvRw-metro-community-edukasi-pilah-sampah-sejak-dini-di-sekolah", task: "u1-l1-v",
            questions: ["How do the children in the video sort their rubbish?", "Which of their ideas could our class use tomorrow?"] },
        ],
      },
      {
        id: "u1-l2", code: "1.2", title: "Where does our rubbish go?", blocks: [
          { t: "p", html: "When we throw something into the bin, it does not disappear. It goes on a journey." },
          { t: "read", title: "The Long Journey of a Plastic Bottle", html: `<p>Imagine you finish a bottle of water. Where does the bottle go next? It can take one of three very different paths.</p>
<p><b>Path 1: The landfill.</b> A rubbish truck takes the bottle to a landfill (in Indonesia, a TPA). It is buried with thousands of tonnes of other rubbish. There is no air or sunlight, so the bottle may stay there for hundreds of years.</p>
<p><b>Path 2: The sea.</b> The bottle is dropped on the street. Rain washes it into a drain, then a river, then the sea. Sun and waves slowly break it into tiny pieces called microplastics. Fish and turtles may eat them, and the pieces can end up in the food we eat. Every year, about 11 million tonnes of plastic leak into the world's lakes, rivers and seas.</p>
<p><b>Path 3: Recycling.</b> The bottle is put in the right bin. It is collected, cleaned, cut into small flakes and melted. The plastic becomes something new: another bottle, a T-shirt, or a bag.</p>
<p>The bottle cannot choose its path. We choose it, every time we throw something away.</p>` },
          { t: "img", src: "img/u1-three-paths.jpg", caption: "Three paths of a plastic bottle. Only path 3 turns the bottle into something useful again; paths 1 and 2 leave it in nature for a very long time." },
          { t: "tool", title: "Thinking Tool: Cause-and-consequence chain", task: "u1-l2-t", html: `<p>Complete the chain for a plastic bag:</p><p class="chain">I use a plastic bag → I throw it away → ______ → ______ → ______</p>
<p class="muted">Possible steps: it goes to a landfill · rain washes it into a river · it flows to the sea · a turtle eats it · it breaks into tiny pieces (microplastics) · fish eat the microplastics · people eat the fish.</p>` },
          { t: "activity", title: "Activity 1.2 — Research at home 🔍", task: "u1-l2-a", html: `<p>Interview a family member using these 5W1H questions. Record the answers.</p>
<ul><li><b>What</b> rubbish does our family make most?</li><li><b>Where</b> does our rubbish go after it leaves the house?</li><li><b>Who</b> collects it?</li><li><b>When</b> is it collected?</li><li><b>Why</b> do we throw some things away instead of using them again?</li><li><b>How</b> could we make less rubbish?</li></ul>` },
          { t: "local", html: "Find out where the rubbish from your town (e.g. Ketapang) goes. Is there a landfill (TPA), a waste bank (bank sampah) or a recycling centre nearby?" },
          { t: "video", title: "What really happens to the plastic you throw away — Emma Bryce (TED-Ed, 4 minutes)", url: "https://www.youtube.com/watch?v=_6xlNyWPpB8", yt: "_6xlNyWPpB8", task: "u1-l2-v",
            questions: ["The video follows three plastic bottles. Draw a cause-and-consequence chain for each one.", "Which ending is best for the planet? Which is most common where you live?", "Write one new question you want to research after watching."] },
        ],
      },
      {
        id: "u1-l3", code: "1.3", title: "Plastic: friend or enemy?", blocks: [
          { t: "source", html: "<b>Source B:</b> Every year the world makes more than 400 million tonnes of plastic. About half is designed to be used only once, and less than 10% is recycled. (Source: United Nations, World Environment Day)" },
          { t: "p", html: "Plastic is not only bad. It keeps food fresh, makes medical tools safe and clean, and is light and cheap." },
          { t: "read", title: "Two Sisters Who Said \"Bye Bye\" to Plastic Bags", html: `<p>In 2013, two sisters from Bali, Melati and Isabel Wijsen, were only 12 and 10 years old. At school they learned about people who changed the world. They asked themselves: <i>Why wait until we are grown up? What can we do now?</i></p>
<p>They looked around their island. Bali is famous for its beautiful beaches, but the sisters saw plastic bags everywhere: in rivers, in rice fields and on the sand. So they started a campaign called <b>Bye Bye Plastic Bags</b>.</p>
<p>The sisters and their friends collected signatures at the airport, gave talks at schools, and organised big beach clean-ups. When the Governor of Bali would not meet them, they even threatened to stop eating until he listened. In 2015, they told their story in a TED Talk in London.</p>
<p>Their hard work, together with many other groups in Bali, helped lead to a ban on single-use plastic in Bali in 2018. Today, Bye Bye Plastic Bags has youth teams in many countries.</p>
<p><b>Think about it:</b> The sisters were not much older than you. What problem in your town would you like to change?</p>` },
          { t: "tool", title: "Thinking Tool: PMI chart for single-use plastic", pmi: true, task: "u1-l3-t", html: "<p>Write the Plus (good points), Minus (bad points) and Interesting (questions I have) about single-use plastic.</p>" },
          { t: "think", task: "u1-l3-k", html: `<ul><li>Should single-use plastic bags be banned in our town? Give one reason for and one reason against.</li><li>Is it fair to ask poor families to pay more for bags?</li></ul>` },
          { t: "dyk", html: "Several Indonesian cities, such as Bogor, Denpasar and Jakarta, have rules limiting single-use plastic bags in shops and markets." },
          { t: "video", title: "Our campaign to ban plastic bags in Bali — Melati and Isabel Wijsen (TED Talk)", url: "https://www.youtube.com/watch?v=P8GCjrDWWUM", yt: "P8GCjrDWWUM", extra: [["Speaker page on TED.com", "https://www.ted.com/speakers/melati_and_isabel_wijsen"]], task: "u1-l3-v",
            questions: ["What problem did the sisters see? What evidence did they give?", "List three actions they took. Which one do you think worked best? Why?", "Fact or opinion? Find one fact and one opinion in their talk."] },
        ],
      },
      {
        id: "u1-l4", code: "1.4", title: "Different people, different views", blocks: [
          { t: "p", html: "A <b>perspective</b> is the way a person sees an issue. It depends on their job, age, culture and experience. Read four example views on plastic packaging (these are example characters, not real people)." },
          { t: "source", html: `<b>Source C: Four voices</b><ul>
<li><b>Ibu Sari, market seller:</b> "Plastic bags are cheap. If I stop giving bags, my customers will go to another stall."</li>
<li><b>Pak Budi, fisherman:</b> "Every week my net catches more plastic than fish. The sea is getting sick."</li>
<li><b>Lina, Grade 6 student:</b> "I bring my own bottle, but our canteen still sells snacks in plastic."</li>
<li><b>Factory manager:</b> "Our company makes plastic packaging and gives jobs to 500 people. We are trying to make recyclable packaging."</li></ul>` },
          { t: "tool", title: "Thinking Tool: Perspectives wheel", html: "<p>Draw a circle divided into four parts. For each person, write: What do they think? Why do they think it? What do they want to happen?</p>" },
          { t: "activity", title: "Activity 1.4", task: "u1-l4-a", html: `<ol><li>Which two people disagree most? Explain.</li><li>Whose perspective is closest to yours?</li><li>Did any perspective change your mind? Write one sentence: "Before, I thought… Now I think…"</li></ol>` },
          { t: "read", title: "Why Do People Disagree?", html: `<p>People often disagree about the same problem because it affects them in different ways. For a market seller, a plastic bag is part of earning money for her family. For a fisherman, the same bag is something that damages the sea he depends on. Neither of them is "bad". They simply stand in different places and see different things.</p>
<p>A good global thinker asks three questions before deciding: <b>Who is affected? How are they affected? What do they need?</b> Often the best solution is one that helps more than one group, for example cheap cloth bags that market sellers can sell to their customers.</p>` },
          { t: "p", html: "<b>Add a fifth voice:</b> Go back to the Bali TED Talk in Lesson 1.3. Add Melati and Isabel to your perspectives wheel. Which of the four people above would they agree with most?" },
          { t: "skills", title: "Skills Focus: Fact or opinion? ⚖️", html: `<p>A <b>fact</b> can be checked and proved ("Less than 10% of plastic is recycled"). An <b>opinion</b> is what someone thinks or feels ("Plastic is the worst invention"). Look for opinion words: <i>I think, best, worst, should, terrible</i>.</p>` },
          { t: "sort", title: "Sort into a Fact / Opinion T-chart", id: "u1-l4-s", groups: ["Fact", "Opinion"], items: [
            ["Food waste is the biggest type of waste in Indonesia.", 0], ["Recycling is boring.", 1], ["Plastic can take hundreds of years to break down.", 0], ["Everyone should bring a reusable bag.", 1]] },
        ],
      },
      {
        id: "u1-l5", code: "1.5", title: "Solutions around the world", blocks: [
          { t: "p", html: "People in many countries are finding ways to reduce waste. Read the three short case studies." },
          { t: "img", src: "img/u1-three-ways.jpg", caption: "Three ways to reduce waste" },
          { t: "list", html: `<ul><li><b>Waste banks, Indonesia:</b> Families bring sorted rubbish to a bank sampah and save money in a waste account.</li><li><b>Zero-waste town, Japan:</b> Some towns sort rubbish into many different groups so most of it can be recycled or reused.</li><li><b>Deposit-return bottles, Germany:</b> Shoppers pay a small extra amount for a bottle and get the money back when they return it.</li></ul>` },
          { t: "read", title: "Kamikatsu, the Town That Sorts Everything", html: `<p>Kamikatsu is a small mountain town in Japan with about 1,500 people. Before 2003, people there burned their rubbish or threw it into the forest. Then the town made a big promise: to become Japan's first zero-waste town.</p>
<p>Today, there is no rubbish truck. Families wash their rubbish and bring it to a collection centre, where they sort it into about 45 groups: different kinds of paper, plastic, metal, glass and more. There is even a shop where people leave old clothes and toys for others to take for free.</p>
<p>The result? More than 80% of the town's waste is recycled, reused or composted. In Japan as a whole, the number is only about 20%.</p>` },
          { t: "read", title: "Germany's Bottle Money", html: `<p>In Germany, when you buy a drink in a bottle or can, you pay a little extra money called <b>Pfand</b> (deposit), between 8 and 25 euro cents. When you bring the empty bottle back to a shop, a machine gives your money back. Because people do not want to lose their money, almost every bottle with a deposit comes back to be recycled or reused.</p>` },
          { t: "read", title: "Banks for Rubbish in Indonesia", html: `<p>In many Indonesian villages and schools there is a <b>bank sampah</b> (waste bank). Members bring clean, sorted rubbish such as bottles, cardboard and cans. The rubbish is weighed and its value is written in a savings book. Later, members can take out money or use it to pay for things. Waste banks turn rubbish into savings and teach people to sort at home.</p>` },
          { t: "activity", title: "Activity 1.5 — Compare solutions 🧩", task: "u1-l5-a", html: `<p>For each solution (waste bank, sorting into many groups, deposit-return bottles), write: How it works · Who takes action? · Could it work in our school or town? Why?</p>` },
          { t: "action", html: "For one week, bring your own bottle and lunch box. Count how many pieces of plastic you saved." },
          { t: "video", title: "Japan's Town With No Waste (Great Big Story)", url: "https://www.youtube.com/watch?v=OS9uhASKyjA", yt: "OS9uhASKyjA",
            extra: [["Also on The Kid Should See This", "https://thekidshouldseethis.com/post/how-this-japanese-town-works-to-produce-no-trash"], ["How Germany's bottle deposit system works (DW Eco Africa)", "https://www.dailymotion.com/video/x9r39q2"]], task: "u1-l5-v",
            questions: ["What do people in Kamikatsu and Germany have to do differently from us?", "Which solution would be easiest to start at our school? Which would be hardest? Use a PMI chart to decide.", "Our school could start a small bank sampah. Who would need to help? Make a list."] },
        ],
      },
    ],
    challenge: {
      title: "School Waste Audit", task: "u1-ch",
      intro: "Your team will find out how much and what kind of waste your class makes, then plan one action to reduce it.",
      roles: "Leader · Recorder · Measurer · Presenter",
      steps: ["<b>Plan:</b> Write 2–3 research questions (e.g. What is the most common waste in our class bin?).",
        "<b>Collect:</b> With your teacher, sort one day's classroom rubbish (wear gloves). Count or weigh each type.",
        "<b>Analyse:</b> Make a bar chart. Which type is the biggest? What are the causes?",
        "<b>Perspectives:</b> Interview one teacher, one canteen worker and one student about the problem.",
        "<b>Act:</b> Choose one solution and write an action plan: What? Who? When? How will we know it worked?",
        "<b>Present:</b> Share your findings in a 3-minute talk or poster."],
      rubric: [
        ["Research", "One simple question; little data", "Clear questions; some data recorded", "Clear questions; data recorded carefully from more than one source"],
        ["Analysis", "Lists the waste", "Shows the biggest type and one cause", "Explains causes and consequences using the chart"],
        ["Perspectives", "One view only", "Two views described", "Three views compared, with reasons"],
        ["Collaboration", "Some members helped", "Everyone had a role", "Everyone had a role and supported each other"],
        ["Communication", "Ideas hard to follow", "Clear but missing a solution", "Clear, organised, with a realistic action plan"],
      ],
    },
    reflect: {
      checks: ["I can write research questions using 5W1H.", "I can read a data table and say what it shows.", "I can explain the journey of rubbish using a cause-and-consequence chain.", "I can tell the difference between a fact and an opinion.", "I can describe at least three perspectives on plastic.", "I took a role and helped my team in the waste audit."],
      journal: ["Finish the L column of your KWL chart.", "One habit I want to change is… because…", "My view about plastic changed / did not change because…", "Two Stars and a Wish: two things my team did well, and one thing we could do better next time."],
    },
    glossary: [["Compost", "Rotted food and plant waste used to feed soil"], ["Consequence", "Something that happens because of an action"], ["Landfill", "A large place where rubbish is buried in the ground"], ["Microplastics", "Very tiny pieces of plastic, smaller than 5 mm"], ["Perspective", "The way a person sees an issue"], ["Pollution", "Harmful things in the air, water or land"], ["Recycle", "Turn used materials into new things"], ["Reduce", "Use or make less of something"], ["Reuse", "Use something again instead of throwing it away"], ["Single-use", "Made to be used only once, then thrown away"], ["Source", "Where information comes from (a book, website, person, chart)"]],
    quiz: [
      { q: "Which type of waste is the biggest in Indonesia (2024)?", o: ["Plastic", "Food waste", "Paper", "Glass"], a: 1, e: "Food waste is about 39% of all waste; plastic is second at about 20%." },
      { q: "Which of these is ORGANIC waste?", o: ["Plastic straw", "Can", "Mango skin", "Snack wrapper"], a: 2, e: "Organic waste rots and can become compost, like fruit skins and leaves." },
      { q: "What are microplastics?", o: ["Plastic made in a factory", "Very tiny pieces of plastic, smaller than 5 mm", "Plastic that has been recycled", "A type of compost"], a: 1, e: "Sun and waves break plastic into tiny pieces called microplastics." },
      { q: "Which path turns a plastic bottle into something useful again?", o: ["The landfill", "The sea", "Recycling", "Burning"], a: 2, e: "Only recycling turns the bottle into a new bottle, T-shirt or bag." },
      { q: "Less than how much of the world's plastic is recycled?", o: ["10%", "50%", "80%", "100%"], a: 0, e: "Source B (United Nations): less than 10% of plastic is recycled." },
      { q: "Which sentence is an OPINION?", o: ["Plastic can take hundreds of years to break down.", "Food waste is the biggest type of waste in Indonesia.", "Recycling is boring.", "Less than 10% of plastic is recycled."], a: 2, e: "Opinions show what someone thinks or feels. \"Boring\" cannot be proved." },
      { q: "What is a perspective?", o: ["A type of rubbish", "The way a person sees an issue", "A research question", "A data table"], a: 1, e: "A perspective depends on a person's job, age, culture and experience." },
      { q: "In Germany, what is \"Pfand\"?", o: ["A recycling machine", "A deposit you get back when you return a bottle", "A zero-waste town", "A plastic tax for shops"], a: 1, e: "Shoppers pay 8–25 euro cents extra and get it back when they return the bottle." },
      { q: "What does a bank sampah (waste bank) do?", o: ["Burns rubbish safely", "Turns sorted rubbish into savings", "Lends money to buy plastic", "Collects rubbish from the sea"], a: 1, e: "Rubbish is weighed and its value is written in a savings book." },
      { q: "About how much of Kamikatsu's waste is recycled, reused or composted?", o: ["About 20%", "About 50%", "More than 80%", "100%"], a: 2, e: "More than 80% in Kamikatsu, compared with about 20% in Japan as a whole." },
    ],
  },

  // ───────────────────────────── UNIT 2
  {
    id: "u2", num: 2, title: "Health and Wellbeing", color: "#e07b39",
    bigQuestion: "What helps young people stay healthy in body and mind?",
    image: "img/u2-healthy.jpg", skills: ["evaluation", "research"],
    goals: ["⚖️ judge whether health advice is reliable", "🔍 collect information about my own habits and record it", "🧩 compare healthy habits in different countries", "💬 plan a campaign to share healthy habits with younger pupils", "🪞 reflect on my own habits and set a goal"],
    wordBank: ["wellbeing", "balanced diet", "nutrients", "physical activity", "screen time", "emotions", "reliable", "claim", "evidence", "habit"],
    getStarted: { task: "u2-gs", html: `<p>Keep a <b>24-hour habit diary</b> for one school day. Record: Time · What I ate or drank · How I moved · Screen time · How I felt.</p><p>In pairs, compare your diaries. What is one thing you do well? What is one thing you could change?</p>` },
    lessons: [
      { id: "u2-l1", code: "2.1", title: "What does \"healthy\" mean?", blocks: [
        { t: "read", title: "Health Is More Than Not Being Sick", html: `<p>When we hear the word <i>healthy</i>, many of us think of a strong body. But health has three parts that work together:</p>
<ul><li><b>Body health:</b> eating well, moving, sleeping and keeping clean.</li><li><b>Mind health:</b> being able to learn, focus and solve problems.</li><li><b>Feelings and friendships:</b> feeling safe, having people to talk to, and getting along with others.</li></ul>
<p>If one part is weak, the others suffer too. A child who sleeps badly finds it hard to concentrate. A child who feels lonely may stop playing sport. The word <b>wellbeing</b> means feeling good in all three parts.</p>` },
        { t: "tool", title: "Thinking Tool: Mind map", task: "u2-l1-t", html: `<p>Draw a mind map with "A healthy me" in the centre and three branches: body, mind, feelings. Add at least three ideas to each branch.</p>` },
      ] },
      { id: "u2-l2", code: "2.2", title: "Food choices around the world", blocks: [
        { t: "read", title: "What Is on Your Plate?", html: `<p>Indonesia's Ministry of Health uses a simple guide called <b>Isi Piringku</b> ("My Plate"). It replaced the old slogan <i>4 Sehat 5 Sempurna</i>. The idea is easy to remember: half of your plate should be vegetables and fruit, and the other half should be staple food (such as rice, corn or cassava) and protein (such as fish, eggs, tempe or tofu). The guide also reminds us to drink water, wash our hands and be active.</p>
<p>Other countries have their own guides. Many use a plate or a pyramid. The foods are different — rice in Indonesia, bread in Europe, tortillas in Mexico — but the message is similar: eat many kinds of food, and eat more vegetables and fruit than sweets.</p>` },
        { t: "img", src: "img/u2-healthy.jpg", caption: "Healthy body, happy mind" },
        { t: "activity", title: "Activity 2.2", task: "u2-l2-a", html: `<ol><li>Draw your lunch from yesterday on a plate. Does it look like Isi Piringku?</li><li>Research a traditional meal from another country. Which food groups does it have?</li><li>Complete the table: Country · Traditional meal · Staple food · Protein · Vegetables / fruit.<br><span class="muted">Example: Indonesia · Nasi, sayur asem, ikan goreng · rice · fish · sayur asem</span></li></ol>` },
        { t: "video", title: "How sugar affects the brain — Nicole Avena (TED-Ed, about 5 minutes)", url: "https://www.youtube.com/watch?v=lEXBxijQREo", yt: "lEXBxijQREo", task: "u2-l2-v",
          questions: ["What happens in the brain when we eat sugar?", "Why is it hard to stop eating sweet things?", "Write one tip to help a friend eat less sugar."] },
      ] },
      { id: "u2-l3", code: "2.3", title: "Sleep, screens and moving more", blocks: [
        { t: "read", title: "The Three Habits Your Body Loves", html: `<p><b>Sleep.</b> Children aged 6 to 12 need 9 to 12 hours of sleep every night. While we sleep, the brain stores what we learned that day and the body grows and repairs itself.</p>
<p><b>Movement.</b> The World Health Organization says children aged 5 to 17 should be active for at least 60 minutes a day on average. It does not have to be one long sport session: walking to school, playing gobak sodor, cycling and helping at home all count.</p>
<p><b>Screens.</b> Phones and tablets are useful, but late-night screen time can make it harder to fall asleep, and long hours of sitting take time away from moving and playing.</p>` },
        { t: "skills", title: "Skills Focus: Collecting data about myself 🔍", html: `<ol><li>Decide what to measure (e.g. hours of sleep).</li><li>Measure at the same time every day for one week.</li><li>Record it in a table.</li><li>Look for a pattern: Which days were best? Why?</li></ol>` },
        { t: "tracker", title: "Activity 2.3 — My 7-day sleep and activity tracker", id: "u2-l3-tr", html: "Record your sleep and active minutes for 7 days. Did you reach 9 hours of sleep and 60 active minutes?" },
        { t: "video", title: "What would happen if you didn't sleep? — Claudia Aguirre (TED-Ed, about 5 minutes)", url: "https://www.youtube.com/watch?v=dqONk48l5vY", yt: "dqONk48l5vY", task: "u2-l3-v",
          questions: ["Name three things that happen to the body and brain without enough sleep.", "Make a cause-and-consequence chain starting with \"I play games until midnight…\""] },
      ] },
      { id: "u2-l4", code: "2.4", title: "Can I trust this health advice?", blocks: [
        { t: "p", html: "We see health advice everywhere: on TV, on packaging, on social media and from friends. Some of it is true; some is just trying to sell something." },
        { t: "source", html: `<b>Source A: Three health messages</b> (made-up examples for practice)<ul>
<li><b>Advert:</b> "Drink SUPER-GROW juice every day and grow 10 cm taller in one month! 100% guaranteed!"</li>
<li><b>Poster from a community health centre (puskesmas):</b> "Wash your hands with soap for 20 seconds before eating."</li>
<li><b>Social media post:</b> "My cousin stopped eating rice and never got sick again. Everyone should stop eating rice!"</li></ul>` },
        { t: "skills", title: "Skills Focus: The Source Checker ⚖️", html: `<p>Ask four questions about every source:</p><ul><li><b>Who</b> made it? Are they an expert?</li><li><b>Why</b> did they make it? To inform, or to sell?</li><li><b>Evidence?</b> Does it give facts, numbers or research?</li><li><b>Too good to be true?</b> Words like <i>100% guaranteed</i> or <i>miracle</i> are warning signs.</li></ul>` },
        { t: "rate", title: "Activity 2.4 — Rate each message", id: "u2-l4-r", task: "u2-l4-a", items: ["Advert: SUPER-GROW juice", "Puskesmas poster: wash your hands", "Social media post: stop eating rice"], html: "Rate each message from 1 (not reliable) to 5 (very reliable). Explain your rating using the Source Checker." },
      ] },
      { id: "u2-l5", code: "2.5", title: "Feelings and friendships", blocks: [
        { t: "read", title: "Looking After Your Feelings", html: `<p>Everyone feels happy, sad, worried or angry sometimes. Feelings are normal, and they give us messages. Worry before a test can remind us to prepare. Sadness after losing something tells us it mattered.</p>
<p>What helps when feelings are big? Talking to someone we trust, moving our body, taking slow deep breaths, drawing or writing, and getting enough sleep. Good friends help too: they listen, include others and say kind words.</p>
<p>If a feeling is very strong or does not go away, it is always a good idea to talk to a parent, teacher or school counsellor.</p>` },
        { t: "think", task: "u2-l5-k", html: `<ul><li>What do people in your family do when they feel stressed?</li><li>How can our class make sure nobody feels left out?</li></ul>` },
      ] },
    ],
    challenge: {
      title: "Healthy Habits Campaign", task: "u2-ch",
      intro: "Your team will teach younger pupils (Grade 2–3) one healthy habit.",
      steps: ["Choose one habit: sleep, water, Isi Piringku, moving, handwashing or kindness.", "Research it using at least two reliable sources. Check them with the Source Checker.", "Survey 10 younger pupils about the habit (e.g. How many hours do you sleep?).", "Create a poster, short role-play or song that shows the habit.", "Present to a younger class and ask them one question afterwards to see what they learned."],
      rubric: [
        ["Evaluation", "Used one source without checking", "Checked sources with some questions", "Used 2+ sources and explained why they are reliable"],
        ["Research", "Little survey data", "Survey done and recorded", "Survey results shown in a chart and explained"],
        ["Communication", "Message unclear", "Clear message", "Clear, fun message suited to young children"],
        ["Collaboration", "Some members helped", "Everyone had a role", "Team planned, practised and supported each other"],
      ],
    },
    reflect: {
      checks: ["I can explain the three parts of health.", "I can describe Isi Piringku.", "I know how much sleep and activity children need.", "I can use the Source Checker to judge health advice.", "I can name healthy ways to deal with big feelings."],
      journal: ["One habit I will improve is…", "My goal for the next two weeks is…", "I will know I have succeeded when…"],
    },
    glossary: [["Balanced diet", "Eating many kinds of food in the right amounts"], ["Claim", "Something a person says is true"], ["Evidence", "Facts that show whether a claim is true"], ["Habit", "Something we do regularly"], ["Reliable", "Can be trusted"], ["Wellbeing", "Feeling good in body, mind and feelings"]],
    quiz: [
      { q: "What are the three parts of health?", o: ["Food, water and sleep", "Body, mind, and feelings and friendships", "School, home and sport", "Eyes, ears and teeth"], a: 1, e: "Wellbeing means feeling good in all three parts." },
      { q: "In Isi Piringku, what should fill HALF of your plate?", o: ["Rice", "Vegetables and fruit", "Fish and eggs", "Sweets"], a: 1, e: "Half vegetables and fruit; the other half staple food and protein." },
      { q: "Which old slogan did Isi Piringku replace?", o: ["Bhinneka Tunggal Ika", "4 Sehat 5 Sempurna", "Bye Bye Plastic Bags", "Gerakan Hidup Sehat"], a: 1, e: "Isi Piringku replaced 4 Sehat 5 Sempurna." },
      { q: "How many hours of sleep do children aged 6–12 need?", o: ["5–6 hours", "7–8 hours", "9–12 hours", "13–15 hours"], a: 2, e: "Children aged 6 to 12 need 9 to 12 hours every night." },
      { q: "How long should children be active each day (WHO)?", o: ["At least 15 minutes", "At least 30 minutes", "At least 60 minutes", "At least 3 hours"], a: 2, e: "WHO: at least 60 minutes a day on average for ages 5–17." },
      { q: "Which health message is MOST reliable?", o: ["SUPER-GROW juice advert", "Puskesmas poster about handwashing", "A social media post about a cousin", "A message that says \"miracle cure\""], a: 1, e: "It comes from health experts, gives a clear action and is not trying to sell something." },
      { q: "Which words are warning signs in health advice?", o: ["\"Wash your hands\"", "\"100% guaranteed\" or \"miracle\"", "\"According to WHO\"", "\"Eat vegetables\""], a: 1, e: "If it sounds too good to be true, it probably is." },
      { q: "What is a good thing to do when a feeling is very strong or does not go away?", o: ["Keep it a secret", "Talk to a parent, teacher or school counsellor", "Stay on your phone", "Stop sleeping"], a: 1, e: "Talking to a trusted adult is always a good idea." },
    ],
  },

  // ───────────────────────────── UNIT 3
  {
    id: "u3", num: 3, title: "Moving Goods and People", color: "#2f7fc1",
    bigQuestion: "Why do goods and people travel around the world, and who benefits?",
    image: "img/u3-coffee.jpg", skills: ["analysis", "communication"],
    goals: ["🧩 trace the journey of a product and explain each step", "🧩 identify reasons why people move to new places", "⚖️ compare who wins and who loses in trade", "💬 present information clearly in an infographic", "🪞 reflect on how my shopping choices affect others"],
    wordBank: ["trade", "import", "export", "producer", "consumer", "supply chain", "container", "migration", "fair trade", "profit"],
    getStarted: { task: "u3-gs", html: `<p>Look at the labels on five things in your bag or at home (clothes, toys, snacks, pencils). Where were they made? Mark each country on a world map. Which country appears most often?</p>` },
    lessons: [
      { id: "u3-l1", code: "3.1", title: "Where do my things come from?", blocks: [
        { t: "read", title: "A World in Your Pencil Case", html: `<p>Your pencil may have wood from one country, graphite from another and paint from a third. It may be put together in a factory in a fourth country and sold in a shop in Ketapang. This is <b>trade</b>: buying and selling goods between places.</p>
<p>When a country sells goods to other countries, it <b>exports</b> them. When it buys goods from other countries, it <b>imports</b> them. Indonesia exports many things the world needs. It is the world's largest producer of palm oil, making more than half of all the palm oil in the world, and one of the world's top coffee producers. Indonesia also imports things such as wheat for bread and noodles, machines and phones.</p>` },
        { t: "activity", title: "Activity 3.1 — Exports and imports T-chart", task: "u3-l1-a", html: "Make a T-chart: Things Indonesia exports / Things Indonesia imports. Use your Get Started map and research to add at least four items to each side." },
      ] },
      { id: "u3-l2", code: "3.2", title: "The journey of a product", blocks: [
        { t: "read", title: "How a Steel Box Changed the World", html: `<p>Before the 1950s, goods were loaded onto ships one sack or box at a time. It took days, and many things were lost or broken. In 1956, an American truck owner named Malcolm McLean had a simple idea: put goods into large steel boxes of the same size, and lift the whole box from truck to ship to train.</p>
<p>These shipping containers changed the world. Ships could be loaded in hours instead of days, and transport became much cheaper. Today, around 80% of the goods traded between countries travel by sea.</p>
<p>A product's journey from the farm or factory to your hands is called a <b>supply chain</b>. Every step adds cost, and every step gives someone a job.</p>` },
        { t: "img", src: "img/u3-coffee.jpg", caption: "The journey of a cup of coffee" },
        { t: "tool", title: "Thinking Tool: Flow chart", task: "u3-l2-t", html: "Choose one product: coffee, palm oil cooking oil, chocolate or a T-shirt. Draw its journey in five steps, like the picture above. Under each step, write <i>Who works here?</i>" },
        { t: "video", title: "How containerization shaped the modern world — Harold Evans (TED-Ed lesson)", url: "https://ed.ted.com/lessons/how-containerization-shaped-the-modern-world", task: "u3-l2-v",
          questions: ["What problem did the container solve?", "Who benefited from cheaper shipping? Did anyone lose?"] },
      ] },
      { id: "u3-l3", code: "3.3", title: "Why people move", blocks: [
        { t: "read", title: "Push and Pull", html: `<p>Goods are not the only things that travel. People move too, from villages to cities, from one island to another, or from one country to another. This is called <b>migration</b>.</p>
<p>People move for many reasons. <b>Push factors</b> make people want to leave a place: no jobs, natural disasters, conflict or poor schools. <b>Pull factors</b> attract people to a new place: work, better education, family who already live there, or safety.</p>
<p>In Indonesia, many people move from villages to big cities to find work. Some Indonesians work abroad, and they send money home to help their families. Others come to study at universities in Java or overseas.</p>` },
        { t: "activity", title: "Activity 3.3 — Interview 🔍", task: "u3-l3-a", html: "Interview a family member or neighbour who has moved (to another city, island or country). Ask: Where did you move from and to? Why? What was hard? What was good? Sort the answers into push and pull factors." },
        { t: "sort", title: "Push or pull?", id: "u3-l3-s", groups: ["Push factor", "Pull factor"], items: [["No jobs in the village", 0], ["Better schools in the city", 1], ["A natural disaster", 0], ["Family already live there", 1], ["Conflict", 0], ["Safety", 1]] },
      ] },
      { id: "u3-l4", code: "3.4", title: "Fair trade, fair pay?", blocks: [
        { t: "read", title: "Who Gets the Money?", html: `<p>Imagine a cup of coffee costs Rp30,000 in a café. How much of that money do you think goes to the farmer who grew the beans? Usually only a very small part. Most of the money goes to the companies that transport, roast, pack and sell the coffee.</p>
<p><b>Fair trade</b> is a movement that tries to change this. Fair trade organisations promise farmers a fairer, more stable price, and an extra amount of money to spend on their community, for example on a school or clean water. Shoppers can look for a fair trade label on products such as coffee, chocolate and bananas.</p>
<p>Not everyone agrees about fair trade. Some people say it really helps farmers. Others say the products cost more, and only some farmers can join.</p>` },
        { t: "tool", title: "Thinking Tool: Perspectives wheel", task: "u3-l4-t", html: "Look at fair trade coffee from four perspectives: coffee farmer, café owner, shopper, shipping company. What does each one want?" },
        { t: "video", title: "A quick guide to the benefits of Fairtrade (video)", url: "https://www.youtube.com/watch?v=iz1pXpE951Y", yt: "iz1pXpE951Y", task: "u3-l4-v",
          questions: ["According to the video, how does fair trade help farmers?", "Is this video trying to inform, persuade or sell? How do you know?"] },
      ] },
      { id: "u3-l5", code: "3.5", title: "Winners and losers", blocks: [
        { t: "p", html: "Trade brings many benefits: more jobs, cheaper goods and more choice. But it can also cause problems: small local shops may close, farmers may be paid too little, and transporting goods long distances creates pollution." },
        { t: "tool", title: "Activity 3.5 — Plus / Minus / Interesting", pmi: true, task: "u3-l5-a", html: "Complete a PMI chart for this statement: <b>\"Indonesia should export more palm oil.\"</b> Think about farmers, the environment, the government and people in other countries." },
      ] },
    ],
    challenge: {
      title: "\"Journey of a Product\" Infographic", task: "u3-ch",
      steps: ["Choose a product made or grown in Kalimantan or Indonesia (e.g. palm oil, rubber, coffee, pepper, rattan).", "Research its journey from producer to consumer. Use at least three sources.", "Show each step, who works there, and one problem along the way.", "Suggest one way to make the journey fairer or greener.", "Present your infographic in a gallery walk."],
      rubric: [
        ["Analysis", "Steps listed", "Steps explained in order", "Steps explained with causes and consequences"],
        ["Perspectives", "One view", "Two views", "Producer, consumer and one other view compared"],
        ["Communication", "Hard to read", "Clear infographic", "Clear, attractive and accurate with sources listed"],
      ],
    },
    reflect: {
      checks: ["I can explain import, export and supply chain.", "I can trace the journey of a product in five steps.", "I can name push and pull factors of migration.", "I can explain what fair trade is and give two views about it."],
      journal: ["Before this unit, I thought my things came from… Now I know…", "Next time I go shopping, I will…"],
    },
    glossary: [["Consumer", "A person who buys and uses goods"], ["Export", "To sell goods to another country"], ["Import", "To buy goods from another country"], ["Migration", "Moving to live in a new place"], ["Producer", "A person or company that grows or makes goods"], ["Supply chain", "All the steps from making a product to selling it"]],
    quiz: [
      { q: "When a country SELLS goods to other countries, it…", o: ["imports them", "exports them", "migrates them", "recycles them"], a: 1, e: "Export = sell to another country. Import = buy from another country." },
      { q: "Indonesia is the world's largest producer of…", o: ["wheat", "phones", "palm oil", "chocolate"], a: 2, e: "Indonesia makes more than half of all the palm oil in the world." },
      { q: "Who had the idea of the shipping container in 1956?", o: ["Malcolm McLean", "Mpu Tantular", "Melati Wijsen", "Harold Evans"], a: 0, e: "Malcolm McLean, an American truck owner." },
      { q: "About how much of the goods traded between countries travel by sea?", o: ["10%", "30%", "50%", "80%"], a: 3, e: "Around 80% of traded goods travel by sea." },
      { q: "What is a supply chain?", o: ["A chain used on ships", "All the steps from making a product to selling it", "A list of shops", "A type of fair trade label"], a: 1, e: "Every step adds cost and gives someone a job." },
      { q: "Which is a PULL factor for migration?", o: ["A natural disaster", "No jobs", "Better education in the new place", "Conflict"], a: 2, e: "Pull factors attract people to a new place." },
      { q: "What does fair trade promise farmers?", o: ["Free machines", "A fairer, more stable price and extra money for their community", "Cheaper products", "No more work"], a: 1, e: "Fair trade gives farmers a fairer price plus money for community projects." },
      { q: "Which is a possible PROBLEM of trade?", o: ["More choice", "Cheaper goods", "More jobs", "Pollution from transporting goods long distances"], a: 3, e: "Trade can also close small shops, underpay farmers and cause pollution." },
    ],
  },

  // ───────────────────────────── UNIT 4
  {
    id: "u4", num: 4, title: "Values and Beliefs", color: "#8e44ad",
    bigQuestion: "How do our values shape the way we live together?",
    image: "img/u4-unity.jpg", skills: ["reflection", "collaboration"],
    goals: ["🪞 explain my own values and where they come from", "🧩 compare traditions and celebrations in Indonesia and the world", "🔍 research how children's rights are protected", "🤝 agree on shared values with my class", "💬 listen respectfully to views that are different from mine"],
    wordBank: ["value", "belief", "tradition", "culture", "respect", "tolerance", "diversity", "rights", "responsibility", "unity"],
    getStarted: { task: "u4-gs", rank: ["honesty", "kindness", "family", "hard work", "fairness", "respect", "friendship", "faith", "courage", "responsibility"],
      html: `<p>Put these values in order from most to least important to you. Compare with a partner. Why are your orders different?</p>` },
    lessons: [
      { id: "u4-l1", code: "4.1", title: "What do I value?", blocks: [
        { t: "read", title: "Values Are Like a Compass", html: `<p>A <b>value</b> is something we believe is important and good. Values guide our choices, like a compass guides a traveller. If you value honesty, you tell the truth even when it is hard. If you value kindness, you help a friend who is sad.</p>
<p>We learn values from many places: our family, our religion, our school, our friends, books and even games. That is why people can have different values, or put the same values in a different order.</p>` },
        { t: "tool", title: "Thinking Tool: Values tree", task: "u4-l1-t", html: "Draw a tree. In the <b>roots</b>, write where your values come from (family, religion, school…). On the <b>trunk</b>, write your three most important values. On the <b>branches</b>, write actions that show those values." },
      ] },
      { id: "u4-l2", code: "4.2", title: "Celebrations and traditions in Indonesia", blocks: [
        { t: "read", title: "One Country, Many Celebrations", html: `<p>Indonesia is home to around 1,340 ethnic groups, hundreds of local languages and six officially recognised religions. Every month, somewhere in Indonesia, people are celebrating.</p>
<p>Muslim families celebrate <b>Idul Fitri</b> at the end of Ramadan by visiting relatives and asking for forgiveness. Christians celebrate <b>Christmas</b>. In Bali, Hindus mark <b>Nyepi</b>, a day of silence when the whole island stays quiet. Buddhists celebrate <b>Waisak</b>, and Chinese Indonesian families celebrate <b>Imlek</b> (Chinese New Year), followed by <b>Cap Go Meh</b>, which is famous in Singkawang. In West Kalimantan, Dayak communities hold <b>Gawai Dayak</b> to give thanks for the rice harvest.</p>
<p>Many families join their neighbours' celebrations too, sharing food and greetings. This is one way Indonesians live out their motto, <b>Bhinneka Tunggal Ika</b>: different, but still one.</p>` },
        { t: "activity", title: "Activity 4.2", task: "u4-l2-a", html: "Choose one celebration that is not from your own family's tradition. Find out: When is it? Why is it celebrated? What do people eat, wear or do? Share three facts with your group." },
      ] },
      { id: "u4-l3", code: "4.3", title: "Values around the world", blocks: [
        { t: "read", title: "Rights for Every Child", html: `<p>In 1989, countries at the United Nations agreed on a special promise for children: the <b>Convention on the Rights of the Child</b>. Almost every country in the world has agreed to it, including Indonesia.</p>
<p>It says every child under 18 has rights, for example the right to go to school, to be healthy, to play, to have a name and nationality, to be safe from harm, and to have their opinions listened to. With rights come <b>responsibilities</b>: if I have the right to learn, I also have a responsibility not to stop others from learning.</p>` },
        { t: "video", title: "Let's learn about rights (UNICEF video)", url: "https://www.unicef.org/parenting/inspiration/lets-learn-about-rights", task: "u4-l3-v",
          questions: ["Name three rights from the video.", "For each right, write one responsibility that goes with it.", "Which right do you think is most often not respected in the world today? Why?"] },
      ] },
      { id: "u4-l4", code: "4.4", title: "Respecting differences", blocks: [
        { t: "source", html: `<b>Source A: A class problem</b> (a made-up story for discussion)<p>Budi's group is planning a class party. Budi wants to play loud music. Ayu cannot eat some of the food Budi suggested because of her religion. Kevin's family does not celebrate birthdays. Siti thinks everyone should just do what the majority wants.</p>` },
        { t: "think", task: "u4-l4-k", html: `<ol><li>What are the different perspectives in this story?</li><li>Is "what the majority wants" always fair? Why or why not?</li><li>Suggest a plan for the party that respects everyone.</li></ol>` },
        { t: "skills", title: "Skills Focus: Respectful discussion 🤝", html: `<ul><li>Listen until the other person finishes.</li><li>Repeat their idea in your own words: "So you think that…"</li><li>Disagree with the idea, not the person: "I see it differently because…"</li><li>Look for what you agree on.</li></ul>` },
      ] },
      { id: "u4-l5", code: "4.5", title: "Unity in diversity", blocks: [
        { t: "read", title: "An Old Motto for a Modern Nation", html: `<p>The words <b>Bhinneka Tunggal Ika</b> are very old. They come from a poem called <i>Kakawin Sutasoma</i>, written by Mpu Tantular during the Majapahit kingdom in the 14th century. Today they are written on the ribbon held by the Garuda Pancasila.</p>
<p>The motto reminds us that people can be different in religion, language, culture and appearance, and still live together as one nation. Unity does not mean everyone is the same. It means we respect each other and work together for the common good.</p>` },
        { t: "img", src: "img/u4-unity.jpg", caption: "Unity in Diversity — Bhinneka Tunggal Ika" },
        { t: "activity", title: "Activity 4.5 — Write a short news report", task: "u4-l5-a", html: "Find one example of Bhinneka Tunggal Ika in your school or town (for example, a mixed sports team or neighbours helping during a festival). Write a short news report about it." },
      ] },
    ],
    challenge: {
      title: "Class Charter of Shared Values", task: "u4-ch",
      steps: ["In groups, list the values that matter most to your class.", "Hold a respectful class discussion and vote on the five most important values.", "For each value, write what it looks like and what it sounds like in our classroom.", "Design and decorate the charter. Every student signs it.", "After two weeks, review: are we living our values?"],
      rubric: [
        ["Reflection", "Names a value", "Explains why a value matters to me", "Explains how my view changed after listening to others"],
        ["Collaboration", "Shares ideas", "Listens and builds on others' ideas", "Helps the group reach a fair agreement"],
        ["Communication", "Ideas unclear", "Clear charter", "Clear charter with examples of actions for each value"],
      ],
    },
    reflect: {
      checks: ["I can explain what a value is and where values come from.", "I can describe celebrations from at least three Indonesian traditions.", "I can name children's rights and the responsibilities that go with them.", "I can disagree respectfully.", "I can explain the meaning of Bhinneka Tunggal Ika."],
      journal: ["A value I saw in someone else this week was…", "Something I learned about another tradition is…"],
    },
    glossary: [["Belief", "Something a person thinks is true"], ["Diversity", "Many different kinds of people or things"], ["Responsibility", "Something you should do"], ["Rights", "Things every person should have or be able to do"], ["Tolerance", "Accepting people who are different from you"], ["Tradition", "A custom passed down over many years"], ["Value", "Something we believe is important"]],
    quiz: [
      { q: "What is a value?", o: ["Something we buy", "Something we believe is important and good", "A celebration", "A type of rule from the government"], a: 1, e: "Values guide our choices, like a compass guides a traveller." },
      { q: "Which celebration is a day of silence in Bali?", o: ["Waisak", "Imlek", "Nyepi", "Gawai Dayak"], a: 2, e: "During Nyepi the whole island stays quiet." },
      { q: "Gawai Dayak is held to give thanks for…", o: ["the new year", "the rice harvest", "the end of Ramadan", "independence"], a: 1, e: "Dayak communities in West Kalimantan give thanks for the rice harvest." },
      { q: "Cap Go Meh is famous in which city?", o: ["Singkawang", "Denpasar", "Bogor", "Jakarta"], a: 0, e: "Cap Go Meh follows Imlek and is famous in Singkawang." },
      { q: "In which year did the UN agree on the Convention on the Rights of the Child?", o: ["1945", "1989", "2015", "2030"], a: 1, e: "In 1989. Almost every country, including Indonesia, has agreed to it." },
      { q: "\"If I have the right to learn, I also have a responsibility…\"", o: ["to stay home", "not to stop others from learning", "to do all the homework for my friends", "to choose my own teacher"], a: 1, e: "With rights come responsibilities." },
      { q: "Where do the words Bhinneka Tunggal Ika come from?", o: ["The UN Convention", "Kakawin Sutasoma by Mpu Tantular", "A TED Talk", "The Pancasila song"], a: 1, e: "A poem from the Majapahit kingdom in the 14th century." },
      { q: "Which is a respectful way to disagree?", o: ["\"You are wrong!\"", "\"I see it differently because…\"", "Stop listening", "Talk louder"], a: 1, e: "Disagree with the idea, not the person." },
    ],
  },

  // ───────────────────────────── UNIT 5
  {
    id: "u5", num: 5, title: "Digital World", color: "#1f9aa8",
    bigQuestion: "How can we use technology wisely, safely and kindly?",
    image: "img/u5-digital.jpg", skills: ["evaluation", "communication"],
    goals: ["⚖️ check whether online information is real or fake", "🔍 collect data about how people use technology", "🧩 explain the risks and benefits of being online", "💬 write a clear guide for other students", "🪞 reflect on my own digital habits"],
    wordBank: ["digital footprint", "password", "personal information", "privacy", "hoax", "source", "cyberbullying", "screen time", "algorithm", "artificial intelligence (AI)"],
    getStarted: { task: "u5-gs", html: `<p>Draw a clock for one day. Colour the hours you use a phone, tablet, TV or computer. What do you use it for: learning, games, videos, chatting? Which use is most helpful to you?</p>` },
    lessons: [
      { id: "u5-l1", code: "5.1", title: "My digital day", blocks: [
        { t: "read", title: "A Connected Country", html: `<p>Indonesia is one of the most connected countries in the world. In 2026, a survey by APJII (the Indonesian Internet Service Providers Association) found that about 235 million Indonesians, or more than 8 out of 10 people, use the internet.</p>
<p>The internet helps us learn, talk to family far away, buy and sell things, and find information in seconds. But not everyone is connected equally: people in big cities usually have faster and cheaper internet than people in remote villages. This is called the <b>digital divide</b>.</p>` },
        { t: "activity", title: "Activity 5.1 — Class survey 🔍", task: "u5-l1-a", html: "Ask 10 people of different ages: How many hours a day do you use the internet? What for? Show the results in a bar chart. Do children and adults use the internet in the same way?" },
      ] },
      { id: "u5-l2", code: "5.2", title: "Real or fake? Checking online information", blocks: [
        { t: "read", title: "Stop, Think, Check", html: `<p>A <b>hoax</b> is false information made to look true. Hoaxes spread fast because people share them before checking. Some are jokes; others can be dangerous, for example fake health cures or false news about a disaster.</p>
<p>Before you share, stop and ask: Who posted this? Is there a date? Do other trusted websites say the same thing? Does the photo really match the story? Does it make me feel very angry or scared? Strong feelings are a sign to slow down and check.</p>` },
        { t: "skills", title: "Skills Focus: Lateral reading ⚖️", html: "Professional fact-checkers do not stay on one website. They open a new tab and search for the same story on other trusted sources (a news organisation, a government website, a scientist). If no trusted source reports it, be careful." },
        { t: "activity", title: "Activity 5.2", task: "u5-l2-a", html: "Your teacher will show three headlines. For each one, use lateral reading and decide: real, fake or not sure? Explain your evidence." },
        { t: "video", title: "How to choose your news — Damon Brown (TED-Ed, about 5 minutes)", url: "https://www.youtube.com/watch?v=q-Y-z6HmRgI", yt: "q-Y-z6HmRgI", extra: [["Full lesson on TED-Ed", "https://ed.ted.com/lessons/how-to-choose-your-news-damon-brown"]], task: "u5-l2-v",
          questions: ["What is the difference between a fact and an opinion in the news?", "Name two ways to check if a news story is reliable."] },
      ] },
      { id: "u5-l3", code: "5.3", title: "Staying safe online", blocks: [
        { t: "read", title: "Your Digital Footprint", html: `<p>Everything you do online leaves a trace, like footprints in sand: the photos you post, the comments you write and the games you join. This is your <b>digital footprint</b>, and it can last for a very long time.</p>
<p>Keep your personal information private: your full name, address, school, phone number and passwords. Use strong passwords that mix words, numbers and symbols, and do not share them with friends. Many social media apps require users to be at least 13 years old. If someone you do not know asks to meet you, or asks for photos or secrets, stop chatting and tell a trusted adult straight away.</p>` },
        { t: "sort", title: "Activity 5.3 — Safe or not safe?", id: "u5-l3-s", groups: ["Safe", "Not safe"], items: [["Sharing your favourite food", 0], ["Sharing your home address", 1], ["Using your pet's name as a password", 1], ["Asking a parent before downloading an app", 0], ["Accepting a friend request from a stranger", 1], ["Turning on privacy settings", 0]] },
        { t: "video", title: "Be Internet Awesome and the Interland game (Google)", url: "https://blog.google/technology/families/be-internet-awesome-helping-kids-make-smart-decisions-online/", task: "u5-l3-v",
          questions: ["Play one world of the free Interland game in class. What did it teach you about passwords, sharing or kindness?"] },
      ] },
      { id: "u5-l4", code: "5.4", title: "Kindness and cyberbullying", blocks: [
        { t: "read", title: "When Words Hurt Online", html: `<p><b>Cyberbullying</b> is bullying using phones, games or social media: sending mean messages, sharing embarrassing photos, spreading rumours or leaving someone out on purpose. Because it can happen at any time and many people can see it, it can feel very hard to escape.</p>
<p><b>If it happens to you:</b> do not reply angrily, save the messages as evidence, block the person, and tell a trusted adult. <b>If it happens to a friend:</b> support them, do not share the hurtful post, and help them get help. Being an <b>upstander</b>, not a bystander, makes a big difference.</p>` },
        { t: "img", src: "img/u5-digital.jpg", caption: "Smart, safe and kind online" },
        { t: "video", title: "Cyberbullying: what is it and how to stop it (UNICEF Indonesia, English and Bahasa Indonesia)", url: "https://www.unicef.org/indonesia/child-protection/what-is-cyberbullying", task: "u5-l4-v",
          questions: ["How can you tell the difference between a joke and bullying?", "Who could you talk to at our school?"] },
      ] },
      { id: "u5-l5", code: "5.5", title: "Technology for good", blocks: [
        { t: "p", html: "Technology can also solve problems. Farmers use apps to check weather and prices. Doctors use video calls to help patients on faraway islands. Artificial intelligence (AI) tools can translate languages and help people learn, but they can also make mistakes or create fake pictures, so we still need to think and check." },
        { t: "tool", title: "Thinking Tool: PMI", pmi: true, task: "u5-l5-t", html: "Complete a Plus / Minus / Interesting chart for: <b>\"Every Grade 6 student should have their own smartphone.\"</b>" },
      ] },
    ],
    challenge: {
      title: "Digital Safety Guide for the School", task: "u5-ch",
      steps: ["Survey 15 students in Grades 4–6 about their online habits and worries.", "Choose the three biggest problems from your survey.", "Research advice from at least two reliable sources.", "Create a guide (booklet, poster or short video) with 5 golden rules for being smart, safe and kind online.", "Present it at a school assembly or share it with parents."],
      rubric: [
        ["Research", "Little data", "Survey results recorded", "Survey results analysed and used to choose problems"],
        ["Evaluation", "Sources not checked", "Sources checked", "Sources compared and reliability explained"],
        ["Communication", "Rules unclear", "Clear rules", "Clear rules with reasons and examples for younger students"],
      ],
    },
    reflect: {
      checks: ["I can explain what a digital footprint is.", "I can use lateral reading to check a story.", "I know what personal information to keep private.", "I know what to do if I see or experience cyberbullying.", "I can describe one benefit and one risk of AI."],
      journal: ["One digital habit I am proud of is…", "One habit I want to change is…"],
    },
    glossary: [["Cyberbullying", "Bullying that happens online"], ["Digital divide", "The gap between people who have good internet access and people who do not"], ["Digital footprint", "The record of everything you do online"], ["Hoax", "False information made to look true"], ["Privacy", "Keeping personal information safe"], ["Upstander", "Someone who speaks up and helps when they see bullying"]],
    quiz: [
      { q: "About how many Indonesians used the internet in 2026 (APJII)?", o: ["35 million", "135 million", "235 million", "335 million"], a: 2, e: "About 235 million — more than 8 out of 10 people." },
      { q: "What is the digital divide?", o: ["A broken screen", "The gap between people with good internet access and people without", "A type of password", "A computer game"], a: 1, e: "City people often have faster, cheaper internet than people in remote villages." },
      { q: "What is a hoax?", o: ["A funny video", "False information made to look true", "A news website", "A strong password"], a: 1, e: "Hoaxes spread fast because people share before checking." },
      { q: "What do fact-checkers do in \"lateral reading\"?", o: ["Read one website very slowly", "Open a new tab and check the story on other trusted sources", "Share the story first", "Only read the headline"], a: 1, e: "If no trusted source reports it, be careful." },
      { q: "Which is SAFE to share online?", o: ["Your home address", "Your password", "Your favourite food", "Your phone number"], a: 2, e: "Keep your full name, address, school, phone number and passwords private." },
      { q: "Which password is strongest?", o: ["Your pet's name", "123456", "A mix of words, numbers and symbols", "Your birthday"], a: 2, e: "Strong passwords mix words, numbers and symbols." },
      { q: "If you are cyberbullied, what should you do?", o: ["Reply angrily", "Delete everything", "Save the messages, block the person and tell a trusted adult", "Share it with everyone"], a: 2, e: "Do not reply angrily; save evidence, block, and tell a trusted adult." },
      { q: "What is an upstander?", o: ["Someone who watches bullying", "Someone who speaks up and helps when they see bullying", "Someone who stands at the back", "A type of app"], a: 1, e: "Being an upstander, not a bystander, makes a big difference." },
    ],
  },

  // ───────────────────────────── UNIT 6
  {
    id: "u6", num: 6, title: "Team Report: Our Global Issue", color: "#c0392b",
    bigQuestion: "What global issue matters to us, and what can we do about it?",
    image: "img/u6-team.jpg", skills: ["research", "analysis", "evaluation", "reflection", "collaboration", "communication"],
    intro: "This final unit brings together everything you have learned. Your team will choose a global issue, research it from different perspectives, write a team research report and present it. This is the kind of project students do in Lower Secondary Global Perspectives.",
    goals: ["In this unit, I will use all six skills: 🔍 Research · 🧩 Analysis · ⚖️ Evaluation · 🪞 Reflection · 🤝 Collaboration · 💬 Communication"],
    wordBank: ["global issue", "research question", "sustainable", "findings", "conclusion", "recommendation", "bibliography", "teamwork", "deadline"],
    getStarted: { html: `<p>The team research process has <b>6 steps</b>. The report moves through these six steps in order; the reflection at the end helps you do better in your next project.</p><img src="img/u6-six-steps.jpg" alt="Six steps of the team research process">` },
    lessons: [
      { id: "u6-l1", code: "6.1", title: "Choosing an issue", blocks: [
        { t: "read", title: "17 Goals for a Better World", html: `<p>In 2015, all 193 member countries of the United Nations agreed on 17 <b>Sustainable Development Goals</b>, also called the Global Goals. They are a to-do list for the whole world to finish by 2030, including ending poverty and hunger, good health, quality education, clean water, clean energy, less inequality, and protecting the ocean, forests and climate.</p>
<p>Every topic you studied this year connects to these goals: waste (Unit 1), health (Unit 2), fair work and trade (Unit 3), peace and respect (Unit 4) and technology (Unit 5). Your team's issue can come from any of them.</p>` },
        { t: "video", title: "World's Largest Lesson, Part 1: introducing the Global Goals", url: "https://worldslargestlesson.globalgoals.org/resource/malala-introducing-the-the-worlds-largest-lesson/", extra: [["World's Largest Lesson, Part 2: how children can invent, innovate and campaign", "https://worldslargestlesson.globalgoals.org/?p=1174"]], task: "u6-l1-v",
          questions: ["Which Global Goal matters most to your team? Why?"] },
        { t: "activity", title: "Activity 6.1", task: "u6-l1-a", html: "As a team, list three possible issues. For each one ask: Is it global? Does it affect our town too? Can we find information about it? Can we suggest an action? Choose one." },
      ] },
      { id: "u6-l2", code: "6.2", title: "Planning research as a team", blocks: [
        { t: "list", html: `<ol><li>Write one main research question, e.g. "How can our town reduce plastic waste in rivers?"</li><li>Write 3–4 smaller questions using 5W1H.</li><li>Give each member a role and a deadline.</li></ol>` },
        { t: "table", title: "Team roles", head: ["Role", "Task"], rows: [["Leader", "Keeps the team on track"], ["Researcher", "Finds and checks sources"], ["Data collector", "Runs a survey or interview"], ["Writer / Designer", "Puts the report together"]] },
        { t: "activity", title: "Our research plan", task: "u6-l2-a", html: "Write your main research question, 3–4 smaller 5W1H questions, and each member's name, role, task and deadline." },
      ] },
      { id: "u6-l3", code: "6.3", title: "Gathering and checking sources", blocks: [
        { t: "p", html: "Use at least four sources of different kinds: a book or article, a reliable website, data (a table or chart), and your own survey or interview. Check every source with the <b>Source Checker</b> from Unit 2 and <b>lateral reading</b> from Unit 5. Record each source in a bibliography: author or organisation, title, date, website or book." },
        { t: "p", html: "<b>Perspectives:</b> Find at least three perspectives on your issue: personal (you and your community), national (Indonesia) and global (another country or an international organisation)." },
        { t: "activity", title: "Our bibliography and perspectives", task: "u6-l3-a", html: "List your sources (author or organisation, title, date, website or book) and write the personal, national and global perspectives you found." },
      ] },
      { id: "u6-l4", code: "6.4", title: "Writing the report", blocks: [
        { t: "p", html: "Use this structure (about 500–800 words for the whole team):" },
        { t: "list", html: `<ol><li><b>Introduction:</b> What is the issue? Why does it matter?</li><li><b>Findings:</b> What did you find out? Include data, a chart and different perspectives.</li><li><b>Causes and consequences:</b> Why is it happening? What will happen if nothing changes?</li><li><b>Solution:</b> What action do you recommend? Who should do it?</li><li><b>Conclusion:</b> Answer your main research question in 2–3 sentences.</li><li><b>Bibliography.</b></li></ol>` },
        { t: "activity", title: "Team report draft", task: "u6-l4-a", html: "Write (or paste) your team report here, following the six-part structure above." },
      ] },
      { id: "u6-l5", code: "6.5", title: "Presenting and reflecting", blocks: [
        { t: "p", html: "Present your report in 5 minutes with a poster or slides. Every member speaks. Then answer questions from the audience." },
        { t: "activity", title: "Final reflection (each student writes alone)", task: "u6-l5-a", html: `<ul><li>How did my view of the issue change during the project?</li><li>What did I do well in the team? What would I do differently?</li><li>Which of the six skills improved most this year? Give an example.</li></ul>` },
      ] },
    ],
    challenge: {
      title: "Team Research Report", task: "u6-ch",
      intro: "Submit your final team research report and presentation notes.",
      steps: ["Choose an issue", "Plan questions (5W1H, roles and a timeline)", "Gather sources (books, websites, interviews)", "Check and analyse (reliable? causes? views?)", "Write the report (issue, findings, solution)", "Present and reflect"],
      rubric: [
        ["Research", "1–2 sources", "3–4 sources recorded", "4+ sources of different kinds, recorded in a bibliography"],
        ["Analysis", "Describes the issue", "Explains causes and consequences", "Explains causes, consequences and links between them"],
        ["Evaluation", "Sources not judged", "Some sources judged", "Explains which sources are most reliable and why"],
        ["Perspectives", "One perspective", "Two perspectives", "Personal, national and global perspectives compared"],
        ["Collaboration", "Uneven teamwork", "Everyone had a role", "Team met deadlines and supported each other"],
        ["Communication", "Hard to follow", "Clear report and talk", "Clear, well-organised report with a realistic solution"],
        ["Reflection", "Little reflection", "Describes what happened", "Explains how own view and skills changed"],
      ],
    },
    reflect: {
      checks: ["I helped choose a global issue and a research question.", "I used and recorded reliable sources.", "I compared personal, national and global perspectives.", "I did my role and met deadlines.", "I can explain how my thinking changed this year."],
      journal: ["How did my thinking change this year?"],
    },
    glossary: [["Bibliography", "A list of the sources you used"], ["Conclusion", "The final answer or main idea at the end"], ["Findings", "What you found out from research"], ["Global issue", "A problem that affects people in many countries"], ["Recommendation", "An action you suggest"], ["Sustainable", "Meeting our needs without harming the future"]],
    quiz: [
      { q: "How many Sustainable Development Goals are there?", o: ["6", "10", "17", "193"], a: 2, e: "17 Global Goals, agreed by 193 UN member countries in 2015." },
      { q: "By which year should the Global Goals be finished?", o: ["2025", "2030", "2045", "2100"], a: 1, e: "They are a to-do list for the whole world to finish by 2030." },
      { q: "What is a bibliography?", o: ["A list of the sources you used", "The first part of a report", "A chart of data", "A type of interview"], a: 0, e: "Record author or organisation, title, date, website or book." },
      { q: "What are the three levels of perspective your report should include?", o: ["Past, present, future", "Personal, national and global", "Teacher, parent, student", "Good, bad, interesting"], a: 1, e: "Personal (you and your community), national (Indonesia) and global." },
      { q: "Which part of the report answers your main research question in 2–3 sentences?", o: ["Introduction", "Findings", "Conclusion", "Bibliography"], a: 2, e: "The conclusion gives the final answer." },
      { q: "What does \"sustainable\" mean?", o: ["Very expensive", "Meeting our needs without harming the future", "Made in another country", "Used only once"], a: 1, e: "Sustainable = meeting our needs without harming the future." },
      { q: "At least how many sources of different kinds should your team use?", o: ["One", "Two", "Four", "Ten"], a: 2, e: "A book or article, a reliable website, data, and your own survey or interview." },
    ],
  },
];

const TEACHER_NOTES = [
  "<b>Timing:</b> 10–12 lessons of 35–40 minutes per unit. Lessons take about 7 lessons; the Unit Challenge takes 3–4; Reflect & Check takes 1.",
  "<b>Differentiation:</b> give sentence starters (\"I think… because…\", \"One cause is…\") to weaker writers; ask strong learners to find a second source and compare the numbers.",
  "<b>Safety:</b> during the waste audit, learners wear gloves and do not touch glass, sharp items or tissues.",
  "<b>Local adaptation:</b> replace the example voices in Lesson 1.4 with real interviews from your school community when possible.",
  "<b>Assessment:</b> use the Unit Challenge success criteria for teacher and peer assessment; keep the KWL chart and reflection journal in each learner's portfolio.",
  "<b>Pacing:</b> each unit takes about 10–12 lessons; Unit 6 can be extended into a 6-week project and used as an end-of-year assessment.",
  "<b>Videos:</b> watch each video before class and check that the link still works. Turn on subtitles (YouTube: CC → auto-translate → Indonesian) for learners who need support.",
];
