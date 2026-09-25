# Natiivi-UI:n luovutus 25.9.2026 (l), klo 08.0x

Jatkaa luovutusta (k) (`viesti-natiivi-ui-luovutus-20260925-k.md`). Proto-git: `/Users/Shared/Claude/proto-3d/Matkakirja-proto`.
Build 13 kulkee juna/b13:n kautta, ja masterin mergeää Natiiviseppä. Kuvaparit ja merge-pyynnöt ovat kansiossa
`proto-3d/lokit/pariteetti-b12/`, ja käännöslokit sekä vierityslokit kansiossa `proto-3d/lokit/loydos51/`.
Worktree: `/Users/Shared/Claude/wt/proto-natiivi-ui-sisallys` (haarat vaihtuvat; muut vanhat worktreet: pariteetti,
nostot ja radio).

## Build 12 (tehty yöllä)
51 (juurisyy: kainalon taitto luettiin lataamattoman kuvan 6 pt:n kehyksestä, joten nosto rakentui uudelleen joka
kehys), #8, #29, #18, 50 vaiheet 1b ja 2 sekä kirjainvali. #1 aloitus on hyväksytty poikkeama.

## Junassa (juna/b13 3f7f220), todennettu
- 65 valikko-65 2def9e7: ☰ ja linssit yhdistetty kaikilla laitteilla. Retkikunta on Muut-paneelin napin takana.
  KOKEET on poistettu pelaajalta: Maailma on KARTTA-ryhmässä, ja muut rivit ovat Kehittäjä-osassa.
- 62 opas-62 602be6c: "Milloin matkaan?" -laatikko (pinon palsta flex-basis auto).
- 59 saapuminen-ei-lehtea a91cbfd: saapuminen ei koskaan avaa lehteä (webin offerQuiz on aina false). Pelikoodari todensi.
- liikkuminen-ui 4a93fd2: PaikanPuheVaiennettu (A7/C14), LiukuAuki (B1), kuvien lento matkakirjaan, A11, A9, C10, C12,
  C13, D17 (KortinRuutupiste) ja A6 (noppa liu'ussa). Pelikoodari todensi (cf195a1).
- 69 selite-69 61e9d9b: karttaselitteen rivit eivät ota osumaa, koska Clickable kaappasi PointerDownin.
- 71 radio-71 420d89e: lapset Ignore ja StopPropagation kuplimisvaiheeseen, koska TrickleDown napissa esti Clickablen.
- 64 lehti-64 08b9c4d: kysely `ui lehti vierita ?`. Bukarest iPad: veto 1:1, heitto 553 pt (Safari 653), korkeus
  vakaa. Omistajan nykiminen on todennäköisesti laitteen suorituskykyä, ja se pitää mitata laitteella.

## Koodattu, 0 virhettä, käännösjonossa todennettavaksi (kaanna-b13d.txt, odotti juna/b13-käännöstä klo 07.41)
Yhdistelmä: ylapalkki-73 + nahtavyydet-63 + lippu-72 + laukku-logo-76 + pulu-chat-66 + hyppy-kuvat + ihminen-74 →
iPad 503000D1 ja iPhone FB234D08.
- 68/73 ylapalkki-73 9824597: pystyssä ei vetopiilotusta (palkki aina näkyvissä), väkäsnappi vain vaakaan kolmena ⌄:nä
  ☰:n paikalla. Pilleri ja ☰ ovat 20 pt reunoista ja Dynamic Islandin korkuisia. Pienennetty paikkakupla näyttää vain
  kaupungin nimen ja on tekstin levyinen, ja vaakamuodossa se piiloutuu palkin mukana. **Todenna:** b13c:ssä pilleri
  oli yhä noin 49 pt. Etumerkki korjattiin a55bb49:ssä, ja lokirivi "MATKAKIRJA ylapalkki saaririvi" kertoo arvot.
- 63 nahtavyydet-63 372f6c3: tuplat (Kokoruutu ja lähde) pois. Kohdekartalla ei ollut lainkaan USS:ää, ja
  Kohdekartta.uss:ään lisättiin webin mitat (kuva, piirros 40, ympyrä 26, kyltti vain valitulla, nimi vain zoomattuna).
  Todenna Bukarestin kortin Nähtävyydet-rivi iPhonella (rivin y noin 713 pt).
- 72 lippu-72 d4ed215: Minipopup.Arkkipohja() ja lippukortti maalehden vaalealla arkilla.
- 76 laukku-logo-76 8c3e403: iPhonella logo laukun oikeassa yläkulmassa → Tietoja.
- 66 pulu-chat-66 e53daa1 (proto-3d/lokit/loydos66-67/pulu-chat-animaatio.md): chatOpen → welcome, chatClose →
  wink, kysymys → chatDashOut ja piilo, ensimmäinen pala → chatDashBack → chatDustOff → bookStudy, luenta estää
  answerin, ja pulu on chatissa täysikokoinen. Pelikoodarin osa (ääneen luku pulun puheena) on haarassa
  pelikoodari/pulu-puhe. Merge-pyyntöön tarvitaan video web vs natiivi.
- 74 ihminen-74 f7918f7: a–c (Linssiseppä todensi videolla, kuvapari kuvapari-b13-ihminen74-iphone.jpg) ja d2
  (tekstin ääriviiva).
- hyppy-kuvat 5558798: paikan vaiennus tyhjentää luennan kuvapakan (Pelikoodarin havainto c535aea: maailmahyppy).

## Tekemättä
- **70 (Fablen linjaus, bugikorjaus):** Maakunnat-välilehti avaa nykyisen maan ryhmän, kun maalla on maakuntia (8 maata:
  FRA, DEU, ITA, ESP, GBR, POL, AUT, CHE). Muissa maissa teksti "Tälle maalle ei ole vielä maakuntia", ja muiden maiden
  ryhmät ovat suljettuina sen alla. Lista päivittyy myös saapuessa ilman uudelleenavausta. Koodi: UI/Maakunnat.cs
  (OletusIso, Rakenna, rakennettu kerran) ja Karttaselite. Webin korjaus tulee Pelikoodarilta.
- Pelikoodarin rivit: C11 (ei dataa pollo.huudahdukselle), C16 (tuurauspaljastus ja ohjekuplat, iso, vaatii luennan
  lykkäyksen PeliOhjaimeen) ja D6 (kehittäjän maailmahyppy lähtövalinnassa). A6 on tehty.
- 74:n laajennus: Fablen mukaan kaikkien linssien palkki Dynamic Islandin riville yhteisellä komponentilla. Nyt vain
  AikajanaNakyma (keksinnöt ja ihmisen matka). MaidenNakymassa on oma vertailupalkki, joka on tarkistamatta.

## Opit
- **Kuorma:** kun kuormitus on yli noin 500 (poltto, CI, Playwright), simulaattorin kosketus ja kuvakaappaus
  epäonnistuvat. Todenna vasta, kun kuorma on laskenut. Jos jäät jumiin, sovella JUMI → FABLE: yksi viesti (tilanne,
  vaihtoehdot, suositus) ja jatka koodaamista.
- **Käännösvahti:** tarkista /tmp/matkakirja-kaannospalvelu.lukko/kuka ennen jonon perumista. Käynnistyneen
  proto-kaanna.sh:n tappaminen jättää orvon aja.sh xcode-sim -puun, joka rikkoo seuraavan käännöksen.
- **UITK:n osumat:** Button, jonka toiminto on null, ottaa silti PointerDownin (Clickable). TrickleDown-StopPropagation
  napissa itsessään estää sen Clickablen.
- **flex-basis 0 sarakkeessa** tarkoittaa korkeutta 0. ScrollViewin sisältösäiliön column/nowrap voittaa USS:n.
- **Kuvakoordinaatit:** kuvaa-b9-JPG on 393 pt leveä, iPhone 402 pt, joten kerro koordinaatit 1,023:lla.
- **Simulaattorin --stdout** ohjataan proto-3d/lokit/-kansioon (ei scratchpadiin).
- **Äänet:** testit Mac Studio -kaiuttimilla mykistettynä, lopuksi Scarlett (palautettu klo 08).
