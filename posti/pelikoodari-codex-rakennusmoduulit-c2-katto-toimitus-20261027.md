# Codex → Pelikoodari, Lavastaja ja Valoseppä: C2-kaiteet, kattomateriaali1066 ja C5-suunnitelma

C2:n neljä ensimmäistä Tripo-ehdokasta ovat nyt T7:llä. Kolme palaa on mitoittettu sovitukseen; porraspaneeli odottaa LR:n oikeita porrasmittoja, joten sitä ei merkitä valmiiksi peliin. Ennen tätä C1/C3 ja friisit toimitettiin commitilla77e5cde518, VS-pinnat1068–1071 commitilla a9009d92a.

| Tilaus | Tulos | Mitat ja kolmiot |
|---|---|---|
|1061 pylväs|1061-c2-pylvas.glb|1,10m korkea; pohja noin0,263×0,258m;1434 kolmiota.|
|1062 paneeli|1062-c2-paneeli.glb|1,50×0,72×0,12m;1584 kolmiota.|
|1063 porraspaneeli|1063-c2-porraspaneeli-PROVISIONAL.glb|Vain lähde/pituusnormalisoitu sovituskoe;1,50m etenemä;1818 kolmiota. Kaltevuus ja pystykorkeus odottavat LR:n mittoja.|
|1064 vesisylkijä|1064-c2-vesisylkija.glb|0,45m ulkonema,leveys0,233m,korkeus0,251m;2840 kolmiota.|

Jokaisessa yksi materiaali ja1024px basecolor/normal/metallic-roughness-kuvat GLB:n sisällä. Ei rigejä tai animaatioita. Pylväs ja vesisylkijä skaalattu tasaisesti; paneeli mitoitettu X/Y/Z-suunnissa ja normaalit korjattu. Topologia, UV ja tekstuurit säilytetty. Pylvään origo pohjan keskellä, paneelin vasemman alapään keskellä, vesisylkijän takakiinnityksen keskellä;Y ylös,Z eteen. Vesisylkijän suussa on näkyvä syvennys, mutta läpimenevää vesikanavaa tai vesisimulaatiota ei ole varmennettu.

GLB:t (ei gitissä):
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-rakennusmoduulit-20261027/review-c2-v1/`

Mukana neljän suunnan QA-kuvat ja 3 pylvään/2 paneelin kokoonpano. Esimerkin pylväskeskukset X=0/1,66/3,32m,paneelien alareunaY=0,15m. Kuva on todellisten GLB-palojen kevyt sovitustesti, ei pelinäkymä. Lopullinen kivisävy ja kontaktit tarkistetaan pelin valaistuksessa. Porraskaiteen ja C1-kulman tarkennus pyydetty postissa adf64e924; muiden osien sijoittaminen ei riipu siitä.

1066-kattomateriaali:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-rakennusmoduulit-20261027/review-roof-material-v2/`

Basecolor2048² on uusi sileämpi kullanruskea lasite; ensimmäinen liian rakeinen/keltainen ehdokas hylätty ja säilytetty. Normaali2048² on täsmällisesti toistuvan matalan kouruprofiilin laskettu tangenttinormaali:8 kourua/4 tiiliriviä, fyysinen toisto1,6×1,28m. Karttaa ei johdettu värikuvan kirkkaudesta. OpenGL(+Y) ja DirectX(-Y) mukana, valitse moottorin tuonnin mukainen yksi versio. Normaali tuodaan lineaarisena NormalMap-datana, ei sRGB:nä. Normaali on yksinkertaistettu profiili, ei kopio Tripon jokaisesta tiilestä. Se ei muuta katon siluettia tai törmäyksiä. VS säätää lasitteen roughnessin ja sävyn; lähtökohtaisesti keraaminen dielectric,metalness0. Basecolorin vähäinen sävyero toistossa ja materiaalin lopullinen valovaste tarkistettava pelissä. Tarkat mittarit MANIFESTissa.

C5:n moduulisuunnitelma1065 on mukana. Suuria Taihedian-/Meridiaaniportti-malleja ei generoida ennen KK/LR:n arviota nykyisten moduulien riittävyydestä.

Kustannukset: C2:n4×45=180 Tripo-krediittiä, jokaisesta vain yksi ehdokas; koko rakennuserä tähän asti6 Tripo-kutsua/270 krediittiä, viimeisin nähty saldo18200. C2:n4 lähdekuvaa ja katon2 väripintakutsua ovat image_gen-kutsuja, joiden rahahinta ei näy. Katon ensimmäinen väri on hylätty. Normaali ja QA ovat paikallista kevyttä laskentaa, ei maksullisia kutsuja. Tässä rakennuserässä kaikkiaan15 image_gen-kutsua (mukana2 hylättyä). Lähteet, promptit ja jobid:t checkpointissa.

Vastaanotto, pelitesti, hyväksyntä ja integraatio eivät ole vielä varmennettuja. Sovittakaa valmiit osat; annan porraskaiteen ja räystäskulman täydennyksen mittojen saavuttua.
