# Omien mallien aurinkovarjot – juurisyy ja koe (Linssiseppä 2, 9.10.2026)

Proto `linssiseppa2/google-tyyli` (KOE, ei junassa): c166e6799 (käännetty dc187000e). Oletus pois; asetukset `omavarjot 1`,
`omavarjokauko 1` (oletus), `omavarjotapa 1` (oletus), `omavarjonaytto 1–5` (diagnostiikka).

## Juurisyy
Kaupunkikameran kaukotaso on PalloKierron kaava "etäisyys + maapallon halkaisija" = 12 757 km ja lähitaso 50 m. URP:n neljä
varjokaskadia romahtivat lähitason kokoisiksi: kaikkien pallojen säde² 849 eli 29 m, mikä on 50 m:n lähitason puolilävistäjä
(fov 50°, kuvasuhde 0,75). Siksi jokainen pikseli jäi kaskadien ulkopuolelle ja varjokerroin oli 1.
Todennus näyttötiloilla: tila 2 (kaskadi) näytti valkoista eli ulkona, tila 3 (varjokoordinaatti) mustaa eli nollamatriisia.
Valo, avainsanat, varjonheittäjät ja vastaanotto olivat kunnossa.

Väärä ensimmäinen epäily (kirjattu, ettei toistu): RenderSettings.sun ei ollut null. Kartan "Valo" oli sun ja sammui jo tavalla 0.

## Korjaus (KOE)
Kun varjot ovat päällä, kaukotaso rajataan `beginCameraRendering`issa kaupunkikameralla arvoon horisontti × 1,5 + 20 km
(vähintään 30 km), esimerkiksi 105 km. Lisäksi oma aurinko on kaupungin kerroksessa ja muiden suuntavalojen
cullingMaskista on poistettu kaupungin kerros. Kaikki palautetaan Sulje-kutsussa. Korjauksen jälkeen kaskadien säteet ovat
140 / 277 / 483 / 875 m (varjomatka 1500 m).

## Kuvaparit (pelistä, v6g-mallit, klo 13)
`docs/raportit/kaappaukset/linssiseppa2-varjot-20261009/`:
- `varjot-pariisi-01-pref-lahi.jpg`: selvin ero. Sisäpihan varjo ja pohjoisjulkisivu varjossa.
- `varjot-pariisi-02-concorde.jpg`, `varjot-tukholma-02-ridd-kaakko.jpg`: pieni ero (katon ulokkeet, kupolit).
- `varjot-tukholma-01-kl-lahi.jpg` ja `-kl-ero.jpg` (erotus ×6): räystäiden, listojen ja portikon pylväiden varjot. Sisäpihan
  varjo jää tästä kulmasta etusiiven taakse.

## Ruutuaika (simulaattori, Macin GPU; laitteen arvo mitataan laitteella)
gpuMs 5 s:n jaksoina, 16 s/variantti:
| Kulma | pois | päällä |
|---|---|---|
| Pariisi prefektuuri | 1,26–1,35 | 1,28–1,29 |
| Pariisi Concorde | 1,29–1,30 | 1,18–1,29 |
| Tukholma KL | 1,78–2,19 | 2,72–6,36 (laattojen latauspiikki samaan aikaan) |
| Tukholma Riddarholmen | 1,22–1,31 | 1,12–1,24 |

Simulaattorissa ei näy selvää kustannusta, paitsi KL:n kulmassa, jossa samaan aikaan latautui laattoja. Laitekustannus jää Natiivisepän arvioitavaksi.

## Kustannus ja rajat Natiivisepälle
- Varjokartta: Ultra_RPAsset 4096², 4 kaskadia. D32-muodossa noin 64 Mt, D16:na 32 Mt. Ehdotus mobiiliin: 2048² ja 2 kaskadia
  (noin 8–16 Mt), varjomatka 1000 m.
- Varjopassi piirtää vain omat mallit (varjonheittäjien rajat 1,6 × 0,4 × 2,5 km). Googlen laatat eivät heitä varjoa eivätkä ota sitä vastaan.
- RAJA: omat mallit varjostavat vain itseään. Esimerkiksi Riddarholmenin tornin varjo ei lankea Googlen maahan, ja Googlen talot eivät
  varjosta omia malleja. Vastaanotto Googlen laattoihin vaatisi niiden varjostimeen varjokartan lukemisen (laattavarjostimen muutos).
- Kaukotason rajaus koskee vain kaupunkinäkymää varjojen ollessa päällä, joten horisontin taakse jääviä laattoja ei piirretä.
  Kuvissa ei näkynyt eroa horisontissa.
