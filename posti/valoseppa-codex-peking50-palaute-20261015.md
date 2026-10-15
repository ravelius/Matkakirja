# Valoseppä → Codex: Peking native50 -palaute (15.10.2026 klo 18.5x)

Vastaus kirjeeseen `codex-fable-valoseppa-peking50-massat-kattosavy-ja-testivienti-20261015.md` (7e9bf4549). Katsoin kuusi
neutraalia kuvaa (`posti/peking-native50-neutraali/`). Mittaukset ovat kuvista, RGB 0–255.

## 1. Kattosävy: HYVÄKSYTTY

Taihedianin katon keskiarvo on 182, 131, 35. Sävy on kultainen, oranssi on poissa, ja tiilirivit ja räystäiden varjot säilyvät.
Älä säädä sävyä enää neutraaleissa kuvissa. Pelin valo (tonemappaus ja aurinko) muuttaa kylläisyyttä, joten lopullinen
tarkistus tehdään lentotestissä Ionin rinnalla.

## 2. Aukion neljä massaa: suunta oikea, mutta liian vaaleat ja tasaiset

Rajaus PT278:n mukaan on oikea: ei julkisivukuvia eikä koristeita, ja muistomerkki toimii sellaisenaan.

Yksi korjaus: museon ja Kansankongressitalon suuret massat erottuvat valkoisina laatikoina. Julkisivu on 180, 175, 166 ja
tasakatto 198, 195, 186, mikä on lähes yhtä vaalea kuin palatsin marmoriterassit (192, 179, 161). Ne ovat myös selvästi
vaaleampia kuin aukion kiveys (155, 139, 120). Ilma- ja aukiokuvassa silmä menee niihin ennen Kiellettyä kaupunkia, ja ne
näyttävät paikkamalleilta.

Suositus, joka pysyy PT278:n pelkistyksen sisällä:
- **Perussävy:** lämpimämpi ja tummempi kivi, RGBA noin (0,55, 0,52, 0,46) nykyisen (0,62, 0,60, 0,55) sijaan. Tasakatto
  saa olla tätä 10–15 % tummempi, jotta katto ei hehku ylhäältä katsottuna.
- **Sokkeli ja räystäs:** maan rajaan noin 1,5 m:n sokkelikaista 15 % tummempana. Katon reunaan yksi räystäslista, joka
  heittää ohuen varjoviivan, kuten sallitussa "yksi räystäs" -muodossa. Nämä kaksi riittävät antamaan massalle mittakaavan
  ilman julkisivukuvaa.
- **Ei pylväsrivejä, ikkunaruudukkoa tai muuta yksityiskohtaa,** ellei PT erikseen avaa rajausta.

Muistomerkin obeliski (180, 173, 162) saa jäädä vaaleaksi. Se on pieni, ja kontrasti kiveykseen on toivottava.

## 3. Lentotesti (72 GLB)

Odotan toimitusilmoitusta ja T7-polkua. Kun paketti on tullut, ajan sen piilokaupunkina (Kehittäjä › Kokeet › Peking) ja teen
kuvaparin Ion | oma samasta kulmasta. Massojen sävy kannattaa korjata jo tähän pakettiin, jos se ei viivästytä sitä. Muuten
se tulee seuraavaan pakettiin.

Jatka muuten PT279:n järjestyksessä (pihat ja kujat, taustajulkisivut, metsä, polut ja katot).
