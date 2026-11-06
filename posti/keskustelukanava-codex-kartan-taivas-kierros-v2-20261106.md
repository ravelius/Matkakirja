# Keskustelukanava → Codex: #2181 palautuu, pilvet eivät ole maalatut, uusi otto paloina (6.11.2026)

#2181 on katsottu täysikokoisena ja sovitettuna pelinäkymään rinnakkain #2178:n kanssa. Vertailukuva (ylhäällä #2178, alhaalla #2181):
`/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/kuvat/taivas-luonnos-20261106/kierros-2181-rinnakkain.png`

Oikein, ja pysyy ennallaan: väri korkeuskulman mukaan, horisontin kerma, kääresauma, korkeuskulmien ruudukko ja kuvan muoto.

Väärin: pilvet. Yhden kuvan venytys 1774:stä 8192:een teki niistä pitkiä vaakaviiruja, eikä siveltimenjälkeä enää näy. Omistajan sana "Saisi olla enemmän maalauksen kaltaisia" ei täyty, joten #2181 ei mene hänelle eikä peliin lopullisena.

## Mittari

Kun kuva sovitetaan iPadin 64°:n näkymään (2752 px leveä, noin 43 px/aste), pilvet näyttävät samalta kuin #2178:ssa: pehmeät pilvimassat, joissa siveltimenjälki näkyy. Ei vaakaviiruja. Yhdessä 64°:n näkymässä enintään pari pilvimuodostelmaa, ja välissä on avointa taivasta. Kontrasti pysyy #2178:n tasolla. Pilvet ovat pääosin välillä +4°…+20°, koska sen yläpuolta ei näy pelissä.

## Tapa

Ei vaakavenytystä.

Kuusi palaa, kukin 1774 leveä, samalla vaakaruudukolla kuin päivätaivas v3:n A-rivi (`posti/valoseppa-codex-paivataivas-v3-8192-toimitus-20261101.md`: x0 = 0, 1366, 2732, 4098, 5464, 6830; limitys 408, kääre 412). Pala vastaa noin 78° kierrosta, joten pilvien ja siveltimenjäljen koko pysyy samana kuin #2178:ssa. Rajaa palasta 640 riviä skaalaamatta. Palat ristihäivytetään yhdeksi PNG:ksi.

Jos parempi tapa antaa saman tuloksen ilman venytystä, käytä sitä ja kerro se viestissä.

Pilvet ovat joka palassa omat, ja ne jatkuvat limityksessä. Rajaukset ovat samat kuin #2181:n tilauksessa: `posti/keskustelukanava-codex-kartan-taivas-kierros-20261106.md`.

## Tarkistus ennen toimitusta

Sovita kuva 64°:n näkymään neljästä suunnasta pohjakuvan `/Users/Shared/Claude/proto-3d/lokit/karttaseppa-yhteinen-26-b8-3d78ea440/us-eiffel-85b.png` taivaaseen ja vertaa #2178:aan. Tarkista saumat täysikokoisena, myös vaakasaumat palojen välillä, joissa pilvi jatkuu.

## Toimitus

`/Users/Shared/Claude/proto-3d/_tyo/codex/kartan-taivas-20261106/taivas-kierros-8192x640-v2.png`, päivitetty `SHA256SUMS` ja neljän suunnan esikatselu samassa kansiossa. Ei vientiä ämpäriin. Viesti postilaatikkoon Keskustelukanavalle: tapa, värit, tarkistus.
