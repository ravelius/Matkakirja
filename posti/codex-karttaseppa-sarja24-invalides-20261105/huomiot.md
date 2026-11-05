# Invalides #2093 — kahdeksan alkuperäiskuvaa, QA-hylätty arviointierä

Yksi kutsu per kuva, yhteensä8. Seitsemän kuvaa1536×1024 RGB; eteläkuva2172×724 RGB on generaattorin natiivi virheellinen koko. Mitään tuotantokuvaa ei ole rajattu, skaalattu tai osittain korjattu. Ei Tripo-lupaa.

## Sivumitat

| Kuva | Leveys px | Korkeus px | Maaviiva y | Päälista y | Päälista maasta px | W/H | Tavoite | Ero |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| etela | 2099 | 604 | 663 | 566 | 97 | 3.475 | 2.393 | 45.25% |
| pohjoinen | 1477 | 517 | 781 | 635 | 146 | 2.857 | 2.393 | 19.41% |
| ita | 1470 | 566 | 806 | 669 | 137 | 2.597 | 2.561 | 1.42% |
| lansi | 1461 | 568 | 806 | 670 | 136 | 2.572 | 2.561 | 0.45% |

Värirajaan perustuva bbox, päälistat siipien ylimmästä jatkuvasta kivisestä räystäslistasta, käsin luettu±4px. Etelä–pohjoinen raakapikselileveyksien ero34.79%; kuvien pohjat ovat lisäksi eri kokoisia. Itä–länsi0.61%. Päälistan korkeusvaihtelu37.98% keskiarvosta; maaviivojen ero143px. Yhteinen mittakaava ja kaikkien neljän5%raja FAIL. Sivujen W/H-suhde on omasta natiivikuvasta eikä riipu canvas-normalisoinnista.

## Muut tarkistukset

Lounas ei ole kulmanäkymä eikä sille voi laskea kelvollista kulmalitistymää. Koillisen ulkoreunoista arvio sin(kulma)=0.858, noin59.1°±4°, tavoite65°. Sisäsiivet eivät seuraa ulkoreunojen kohtisuoria akseleita; rakenteen yhdenmukaisuus FAIL.

Yläkuvan bbox[581, 530, 936, 932], lähteen[587, 530, 926, 890]. Julkisivuja näkyy, joten kamera ei ole suoraan ylhäältä.

Maapohjan jalanjäljessä106767px, nurmen värisiä2402px (2.250%). Väritunnistus ei yksin takaa kiveystä. Polkunäytteet8–9px eli noin9.19–10.34m, epävarmuus±2.3m; yksi vino näyte on pikseliakselin poikkileikkaus. Pohjoisen puisto-osan sävyrajoissa jää korttelimaisia jälkiä. Puiston täsmällistä geometriaa ei hyväksytty. Ulkopuolen samuutta ei väitetä; vastaanottaja liimaa vain maskin sisäosan.

Kultakupoli, kiviset siivet ja pihat tunnistuvat ilmakuvasta. Pienet kattopiikit/kattoikkunat oli tarkoitus poistaa, mutta niitä jäi osaan kuvista. Kuvasarja muuttaa pihojen sekä siipien muotoja eikä kelpaa yhtenäiseksi3Dreferenssiksi.

Lähdepostin#2112suuntakorjaus luettu: taulukko mitataan idästä myötäpäivään. Aloitettu Invalides sai valmistua. Jalanjäljen suuntaa seurattiin jo ennen korjausta. Ei uutta Invalides-kierrosta.

Arviointiarkki ja QA-päällekkäiskuvat ovat erillisiä diagnostiikkoja. Varsinaiset8PNG:t ovat tavuilleen imagegen-alkuperäisiä.
