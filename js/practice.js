// Latihan cepat yang dinilai otomatis, satu set per pelajaran.
// Tipe: mc (pilihan ganda), tf (benar/salah), fill (isian; a = daftar jawaban yang diterima),
//       match (pasangkan kiri-kanan), order (urutkan; items ditulis dalam urutan BENAR).
const PRACTICE = {
  // ── UNIT 1
  "u1-l1": [
    { t: "fill", q: "Food waste is ___ waste: it rots and can become compost.", a: ["organic"], e: "Organic waste rots. Plastic is inorganic." },
    { t: "mc", q: "About how much waste did Indonesian cities and regencies report in 2024?", o: ["3 million tonnes", "33 million tonnes", "330 million tonnes"], a: 1, e: "About 33 million tonnes — heavier than 5 million elephants!" },
    { t: "tf", q: "About half of all rubbish in Indonesia comes from our homes.", a: true, e: "Yes, about half comes from households." },
    { t: "match", q: "Organic or inorganic?", pairs: [["Banana peel", "Organic"], ["Plastic straw", "Inorganic"], ["Leaves", "Organic"], ["Can", "Inorganic"]] },
  ],
  "u1-l2": [
    { t: "order", q: "Put the journey of a bottle to the sea in order.", items: ["The bottle is dropped on the street", "Rain washes it into a drain", "It flows down a river", "It reaches the sea", "Waves break it into microplastics"] },
    { t: "mc", q: "In Indonesia, a landfill is called a…", o: ["TPA", "bank sampah", "puskesmas"], a: 0, e: "TPA = Tempat Pemrosesan Akhir (landfill)." },
    { t: "tf", q: "In a landfill, a plastic bottle breaks down in a few weeks.", a: false, e: "With no air or sunlight it may stay there for hundreds of years." },
    { t: "fill", q: "Very tiny pieces of plastic are called ___.", a: ["microplastics", "microplastic"], e: "Microplastics are smaller than 5 mm." },
  ],
  "u1-l3": [
    { t: "mc", q: "What did Melati and Isabel Wijsen call their campaign?", o: ["Clean Bali", "Bye Bye Plastic Bags", "Zero Waste Kids"], a: 1 },
    { t: "fill", q: "Bali banned single-use plastic in the year ___.", a: ["2018"] },
    { t: "tf", q: "Plastic has some good points, for example it keeps food fresh.", a: true, e: "Plastic is light, cheap and keeps food and medical tools clean." },
    { t: "match", q: "Match the PMI parts.", pairs: [["Plus", "good points"], ["Minus", "bad points"], ["Interesting", "questions I have"]] },
  ],
  "u1-l4": [
    { t: "fill", q: "A ___ is the way a person sees an issue.", a: ["perspective"] },
    { t: "match", q: "Who said it?", pairs: [["Ibu Sari", "Plastic bags are cheap."], ["Pak Budi", "My net catches more plastic than fish."], ["Factory manager", "We give jobs to 500 people."]] },
    { t: "mc", q: "Which word often shows an OPINION?", o: ["percent", "should", "tonnes"], a: 1, e: "Opinion words: I think, best, worst, should, terrible." },
    { t: "tf", q: "\"Less than 10% of plastic is recycled\" is a fact.", a: true, e: "It can be checked and proved." },
  ],
  "u1-l5": [
    { t: "match", q: "Match the solution to the country.", pairs: [["Bank sampah", "Indonesia"], ["Kamikatsu zero-waste town", "Japan"], ["Pfand bottle deposit", "Germany"]] },
    { t: "mc", q: "Into about how many groups do people in Kamikatsu sort their rubbish?", o: ["3", "12", "45"], a: 2 },
    { t: "fill", q: "In Germany, the deposit you get back for a bottle is called ___.", a: ["pfand"] },
    { t: "tf", q: "Kamikatsu recycles less waste than Japan as a whole.", a: false, e: "Kamikatsu: more than 80%. Japan: about 20%." },
  ],
  // ── UNIT 2
  "u2-l1": [
    { t: "match", q: "Match each part of health with an example.", pairs: [["Body", "sleeping and eating well"], ["Mind", "learning and solving problems"], ["Feelings and friendships", "having people to talk to"]] },
    { t: "fill", q: "Feeling good in body, mind and feelings is called ___.", a: ["wellbeing", "well-being"] },
    { t: "tf", q: "If one part of health is weak, the other parts can suffer too.", a: true },
  ],
  "u2-l2": [
    { t: "fill", q: "Indonesia's \"My Plate\" guide is called Isi ___.", a: ["piringku"] },
    { t: "mc", q: "Which is a PROTEIN food?", o: ["Rice", "Tempe", "Cassava"], a: 1, e: "Fish, eggs, tempe and tofu are protein." },
    { t: "tf", q: "Every country uses exactly the same foods in its food guide.", a: false, e: "The foods are different, but the message is similar." },
    { t: "match", q: "Match the staple food to the place.", pairs: [["Rice", "Indonesia"], ["Bread", "Europe"], ["Tortillas", "Mexico"]] },
  ],
  "u2-l3": [
    { t: "fill", q: "Children aged 5 to 17 should be active for at least ___ minutes a day.", a: ["60", "sixty"] },
    { t: "mc", q: "How many hours should children aged 6–12 sleep?", o: ["6–8", "9–12", "13–15"], a: 1 },
    { t: "tf", q: "Late-night screen time can make it harder to fall asleep.", a: true },
    { t: "order", q: "Order the steps for collecting data about myself.", items: ["Decide what to measure", "Measure at the same time every day", "Record it in a table", "Look for a pattern"] },
  ],
  "u2-l4": [
    { t: "match", q: "Match the Source Checker question to what it checks.", pairs: [["Who?", "Is the maker an expert?"], ["Why?", "To inform or to sell?"], ["Evidence?", "Facts, numbers or research"]] },
    { t: "mc", q: "Which message is MOST reliable?", o: ["SUPER-GROW juice advert", "Puskesmas handwashing poster", "Post about a cousin who stopped eating rice"], a: 1 },
    { t: "tf", q: "\"100% guaranteed\" is a warning sign in health advice.", a: true, e: "If it sounds too good to be true, check carefully." },
  ],
  "u2-l5": [
    { t: "tf", q: "Feelings like worry and sadness are normal.", a: true },
    { t: "mc", q: "What is a healthy way to deal with a big feeling?", o: ["Keep it secret forever", "Take slow deep breaths and talk to someone you trust", "Stay awake all night"], a: 1 },
    { t: "fill", q: "If a feeling is very strong, talk to a parent, teacher or school ___.", a: ["counsellor", "counselor"] },
  ],
  // ── UNIT 3
  "u3-l1": [
    { t: "match", q: "Match the word to its meaning.", pairs: [["Export", "sell goods to another country"], ["Import", "buy goods from another country"], ["Trade", "buying and selling goods between places"]] },
    { t: "mc", q: "Indonesia is the world's largest producer of…", o: ["wheat", "palm oil", "phones"], a: 1 },
    { t: "tf", q: "Indonesia imports wheat for bread and noodles.", a: true },
  ],
  "u3-l2": [
    { t: "order", q: "Order the journey of a cup of coffee.", items: ["Farm: farmers pick coffee cherries", "Factory: beans are dried and roasted", "Ship: containers cross the sea", "Shop: coffee is sold", "Your cup: someone enjoys a drink"] },
    { t: "fill", q: "All the steps from making a product to selling it is called a supply ___.", a: ["chain"] },
    { t: "mc", q: "About how much of traded goods travel by sea?", o: ["20%", "50%", "80%"], a: 2 },
    { t: "tf", q: "Shipping containers made transport more expensive.", a: false, e: "Containers made loading faster and transport much cheaper." },
  ],
  "u3-l3": [
    { t: "match", q: "Push or pull factor?", pairs: [["No jobs", "Push"], ["Better schools", "Pull"], ["Natural disaster", "Push"], ["Family already there", "Pull"]] },
    { t: "fill", q: "Moving to live in a new place is called ___.", a: ["migration"] },
    { t: "tf", q: "Some Indonesians work abroad and send money home to their families.", a: true },
  ],
  "u3-l4": [
    { t: "tf", q: "The coffee farmer usually gets most of the money from a café coffee.", a: false, e: "Usually only a very small part goes to the farmer." },
    { t: "mc", q: "What does fair trade promise farmers?", o: ["Free machines", "A fairer, more stable price", "No more work"], a: 1 },
    { t: "fill", q: "Shoppers can look for a fair trade ___ on coffee, chocolate and bananas.", a: ["label"] },
  ],
  "u3-l5": [
    { t: "match", q: "Benefit or problem of trade?", pairs: [["More jobs", "Benefit"], ["Pollution from transport", "Problem"], ["More choice", "Benefit"], ["Small shops may close", "Problem"]] },
    { t: "mc", q: "Which thinking tool helps you weigh up a statement?", o: ["KWL chart", "PMI chart", "Values tree"], a: 1 },
  ],
  // ── UNIT 4
  "u4-l1": [
    { t: "fill", q: "A ___ is something we believe is important and good.", a: ["value"] },
    { t: "mc", q: "Values guide our choices like a ___ guides a traveller.", o: ["map", "compass", "car"], a: 1 },
    { t: "tf", q: "Everyone learns exactly the same values in the same order.", a: false, e: "We learn values from family, religion, school and friends, so they can differ." },
  ],
  "u4-l2": [
    { t: "match", q: "Match the celebration.", pairs: [["Nyepi", "a day of silence in Bali"], ["Gawai Dayak", "thanks for the rice harvest"], ["Cap Go Meh", "after Imlek, famous in Singkawang"], ["Idul Fitri", "end of Ramadan"]] },
    { t: "fill", q: "Indonesia's motto Bhinneka Tunggal ___ means \"different, but still one\".", a: ["ika"] },
    { t: "mc", q: "About how many ethnic groups live in Indonesia?", o: ["134", "1,340", "13,400"], a: 1 },
  ],
  "u4-l3": [
    { t: "fill", q: "The UN Convention on the Rights of the Child was agreed in ___.", a: ["1989"] },
    { t: "tf", q: "The Convention covers children under 18.", a: true },
    { t: "match", q: "Match the right to a responsibility.", pairs: [["Right to learn", "don't stop others from learning"], ["Right to be safe", "don't hurt others"], ["Right to be listened to", "listen to others too"]] },
  ],
  "u4-l4": [
    { t: "mc", q: "Which is a respectful way to disagree?", o: ["\"You are wrong!\"", "\"I see it differently because…\"", "Stop listening"], a: 1 },
    { t: "order", q: "Order the steps of a respectful discussion.", items: ["Listen until the other person finishes", "Repeat their idea in your own words", "Disagree with the idea, not the person", "Look for what you agree on"] },
    { t: "tf", q: "\"What the majority wants\" is always fair for everyone.", a: false, e: "The majority can forget people like Ayu and Kevin." },
  ],
  "u4-l5": [
    { t: "mc", q: "Who wrote Kakawin Sutasoma?", o: ["Mpu Tantular", "Malcolm McLean", "Melati Wijsen"], a: 0 },
    { t: "tf", q: "Unity means everyone must be the same.", a: false, e: "Unity means we respect each other and work together." },
    { t: "fill", q: "Bhinneka Tunggal Ika is written on the ribbon held by the Garuda ___.", a: ["pancasila"] },
  ],
  // ── UNIT 5
  "u5-l1": [
    { t: "fill", q: "The gap between people with good internet access and people without is the digital ___.", a: ["divide"] },
    { t: "mc", q: "About how many Indonesians used the internet in 2026?", o: ["135 million", "235 million", "335 million"], a: 1 },
    { t: "tf", q: "People in remote villages usually have faster internet than people in big cities.", a: false },
  ],
  "u5-l2": [
    { t: "fill", q: "False information made to look true is a ___.", a: ["hoax"] },
    { t: "mc", q: "In lateral reading, fact-checkers…", o: ["stay on one website", "open a new tab and check other trusted sources", "share the story first"], a: 1 },
    { t: "tf", q: "If a post makes you very angry or scared, that is a sign to slow down and check.", a: true },
  ],
  "u5-l3": [
    { t: "match", q: "Safe or not safe?", pairs: [["Sharing your favourite food", "Safe"], ["Sharing your home address", "Not safe"], ["Turning on privacy settings", "Safe"], ["Using your pet's name as a password", "Not safe"]] },
    { t: "fill", q: "Everything you do online leaves a digital ___.", a: ["footprint"] },
    { t: "mc", q: "Which password is strongest?", o: ["kucing", "123456", "Kucing!Biru7Pagi"], a: 2 },
  ],
  "u5-l4": [
    { t: "order", q: "If you are cyberbullied, what should you do? Put the steps in order.", items: ["Do not reply angrily", "Save the messages as evidence", "Block the person", "Tell a trusted adult"] },
    { t: "fill", q: "Someone who speaks up and helps when they see bullying is an ___.", a: ["upstander"] },
    { t: "tf", q: "Sharing a hurtful post is a good way to help your friend.", a: false },
  ],
  "u5-l5": [
    { t: "mc", q: "Why do we still need to check what AI tools make?", o: ["AI is always right", "AI can make mistakes or fake pictures", "AI is too slow"], a: 1 },
    { t: "match", q: "Match the technology to how it helps.", pairs: [["Weather apps", "farmers"], ["Video calls", "doctors on faraway islands"], ["Translation tools", "people learning languages"]] },
  ],
  // ── UNIT 6
  "u6-l1": [
    { t: "fill", q: "The UN agreed on ___ Sustainable Development Goals.", a: ["17", "seventeen"] },
    { t: "mc", q: "By which year should the Global Goals be reached?", o: ["2025", "2030", "2050"], a: 1 },
    { t: "tf", q: "A good team issue should affect our town and let us suggest an action.", a: true },
  ],
  "u6-l2": [
    { t: "match", q: "Match the team role to its task.", pairs: [["Leader", "keeps the team on track"], ["Researcher", "finds and checks sources"], ["Data collector", "runs a survey or interview"], ["Writer / Designer", "puts the report together"]] },
    { t: "mc", q: "Which tool helps write good research questions?", o: ["5W1H", "PMI", "Values tree"], a: 0 },
  ],
  "u6-l3": [
    { t: "fill", q: "A list of the sources you used is a ___.", a: ["bibliography"] },
    { t: "match", q: "Match the perspective level.", pairs: [["Personal", "you and your community"], ["National", "Indonesia"], ["Global", "another country or an international organisation"]] },
    { t: "mc", q: "At least how many sources should your team use?", o: ["1", "2", "4"], a: 2 },
  ],
  "u6-l4": [
    { t: "order", q: "Put the parts of the report in order.", items: ["Introduction", "Findings", "Causes and consequences", "Solution", "Conclusion", "Bibliography"] },
    { t: "tf", q: "The conclusion answers your main research question in 2–3 sentences.", a: true },
  ],
  "u6-l5": [
    { t: "tf", q: "In the presentation, only the leader speaks.", a: false, e: "Every member speaks." },
    { t: "mc", q: "How long should the team presentation be?", o: ["1 minute", "5 minutes", "30 minutes"], a: 1 },
  ],
};
