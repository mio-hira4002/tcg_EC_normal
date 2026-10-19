/* TCG GATE JAPAN — sample catalog
   商品名は実際の品ぞろえを参考にしたサンプル、価格・在庫・買取価格は仮の値です。
   公開前に実在庫・実売価格へ差し替えてください（Shopifyでは商品・メタフィールドとして登録）。
   画像：assets/images/<id>.jpg を置くと仮カードが写真に切り替わります。 */
window.TCG = {
  freeShippingLine: 20000, /* [要確認] 仮の送料無料ライン */
  products: [
    { id:"m1", name:"メガリザードンYex", en:"Mega Charizard Y ex", rarity:"MUR", set:"MEGA", num:"—", hp:360, cond:"S", cat:"single", price:128000, buy:95000, stock:1, badge:"PREMIUM", hue:44, type:"gold" },
    { id:"m2", name:"メガリザードンXex", en:"Mega Charizard X ex", rarity:"MUR", set:"MEGA", num:"—", hp:360, cond:"S", cat:"single", price:118000, buy:88000, stock:2, badge:"NEW", hue:40, type:"gold" },
    { id:"m3", name:"ロケット団のミュウツーex", en:"Team Rocket's Mewtwo ex", rarity:"SAR", set:"SV10", num:"—", hp:280, cond:"A", cat:"single", price:39800, buy:30000, stock:3, badge:"HOT", hue:350 },
    { id:"m4", name:"ブラッキーex", en:"Umbreon ex", rarity:"SAR", set:"SV8a", num:"—", hp:280, cond:"A", cat:"single", price:168000, buy:130000, stock:1, badge:"PREMIUM", hue:230 },
    { id:"m5", name:"ピカチュウex", en:"Pikachu ex", rarity:"SAR", set:"MEGA", num:"—", hp:200, cond:"A", cat:"single", price:24800, buy:18000, stock:4, badge:"NEW", hue:95 },
    { id:"m6", name:"メガゲンガーex", en:"Mega Gengar ex", rarity:"SAR", set:"MEGA", num:"—", hp:350, cond:"A", cat:"single", price:19800, buy:14000, stock:5, hue:280 },
    { id:"m7", name:"リーリエのピッピex", en:"Lillie's Clefairy ex", rarity:"SAR", set:"SV9", num:"—", hp:190, cond:"S", cat:"single", price:14800, buy:10000, stock:6, hue:330 },
    { id:"m8", name:"ゼクロムex", en:"Zekrom ex", rarity:"SAR", set:"SV11B", num:"—", hp:230, cond:"A", cat:"single", price:9800, buy:6500, stock:0, hue:150, type:"dark" },
    { id:"m9", name:"レシラムex", en:"Reshiram ex", rarity:"SAR", set:"SV11W", num:"—", hp:230, cond:"A", cat:"single", price:9800, buy:6500, stock:7, hue:210, type:"light" },
    { id:"m10", name:"パラダイスリゾート", en:"Paradise Resort", rarity:"SAR", set:"SV", num:"—", hp:0, cond:"A", cat:"single", price:2980, buy:1800, stock:12, hue:190, type:"trainer" },
    { id:"p4", name:"リザードンVMAX", en:"Charizard VMAX", rarity:"PSA10", set:"S8b", num:"308/172", cond:"PSA10", cat:"psa10", price:148000, buy:0, stock:1, badge:"HOT", hue:12, year:"2021", label:"VMAX CLIMAX" },
    { id:"p8", name:"ミミッキュ HR", en:"Mimikyu HR", rarity:"PSA10", set:"S10b", num:"075/070", cond:"PSA10", cat:"psa10", price:28000, buy:28000, stock:2, hue:50, year:"2022", label:"POKEMON GO" },
    { id:"p9", name:"ブースターex【RR】", en:"Flareon ex [RR]", rarity:"PSA10", set:"SV8a", num:"022/187", cond:"PSA10", cat:"psa10", price:58000, buy:0, stock:0, hue:28, year:"2024", label:"SV8a BOOSTER ex - RR" },
    { id:"p7", name:"旧裏 リザードン", en:"Charizard (original back)", rarity:"CCP", set:"Base", num:"4/102", cond:"B", cat:"old", price:180000, buy:180000, stock:1, hue:24 }
  ],
  sets: [
    { code:"MEGA", name:"MEGAシリーズ [正式名称要確認]", en:"MEGA series", date:"", isNew:true },
    { code:"M5", name:"アビスアイ", en:"Abyss Eye", date:"2026.05.22", isNew:true },
    { code:"M4", name:"ニンジャスピナー", en:"Ninja Spinner", date:"" },
    { code:"H3", name:"MEGAドリームex", en:"MEGA Dream ex", date:"" },
    { code:"M3", name:"メガシンフォニア", en:"Mega Symphonia", date:"" },
    { code:"H2", name:"インフェルノX", en:"Inferno X", date:"" }
  ],
  cats: [
    { id:"psa10", k:"PSA10", name:"PSA10鑑定品", en:"PSA 10" },
    { id:"psa9", k:"PSA9", name:"PSA9鑑定品", en:"PSA 9" },
    { id:"oripa", k:"ORIPA", name:"オリパ", en:"Oripa" },
    { id:"single", k:"SINGLES", name:"シングル・キズ特価", en:"Singles" },
    { id:"old", k:"OLD", name:"旧裏", en:"Vintage" },
    { id:"box", k:"BOX", name:"未開封BOX・その他", en:"Sealed" }
  ],
  conds: {
    S:{ ja:"状態S", note:"新品同様", en:"Grade S" },
    A:{ ja:"状態A", note:"美品", en:"Grade A" },
    B:{ ja:"状態B", note:"並品", en:"Grade B" },
    PSA10:{ ja:"PSA10", note:"鑑定済", en:"PSA 10" }
  },
  buyback: [
    { id:"b1", name:"ピカチュウex SAR", num:"234/193", price:60000, cat:"single", hue:44 },
    { id:"b2", name:"メガガルゴex MUR", num:"092/093", price:60000, cat:"single", hue:258 },
    { id:"b3", name:"旧裏 リザードン CCP", num:"4/102", price:180000, cat:"old", hue:24 },
    { id:"b4", name:"ミミッキュ HR PSA10", num:"075/070", price:28000, cat:"psa10", hue:50 }
  ],
  shops: [
    { id:"akihabara", k:"AKIHABARA", name:"秋葉原本店", area:"TOKYO", main:true, addr:"東京都千代田区外神田1-2-3 秋葉原TCGビル 1F-3F", tel:"03-0000-0000", hours:"11:00〜21:00", off:"年中無休", access:"JR秋葉原駅 電気街口より徒歩2分", note:"PSA鑑定カード・限定カードを中心とした体験型旗艦店" },
    { id:"nishijin", k:"NISHIJIN", name:"福岡西新店", area:"FUKUOKA", addr:"福岡県福岡市早良区西新1-2-3 TCGビル 1F", tel:"092-000-0000", hours:"11:00〜20:00", off:"毎週水曜日", access:"地下鉄空港線 西新駅 4番出口より徒歩3分" },
    { id:"kurume", k:"KURUME", name:"久留米店", area:"FUKUOKA", addr:"福岡県久留米市東町5-6-7 KMビル 2F", tel:"0942-00-0000", hours:"11:00〜20:00", off:"毎週水曜日", access:"JR久留米駅 西口より徒歩5分" }
  ]
};
