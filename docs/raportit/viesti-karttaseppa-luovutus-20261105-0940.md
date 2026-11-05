# Karttaseppä: luovutus 5.11.2026 klo 09.40 (KS)
Syy: omistaja käynnistää ohjelman uudelleen (PT 09.38), konteksti 30 %. **Lue tämä, sitten suunnitelman MUUTOS 1 (/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261105-nahtavyydet-sarjana.md), sitten -0858 (994f05e0b).** Tämä voittaa ristiriidassa. Python: /opt/homebrew/opt/python@3.14/bin/python3, ilman -I. D = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-alueet-20261104/saari-pohja. S = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/nahtavyyssarja. Worktree /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219 (natiivi-backup), kärki b2ce1653f, puhdas.

## ENSIN
1. Vahti Monitorilla: kirjoita vahti.zsh uudelleen (fetch origin claude/postilaatikko 60 s välein, /Users/Shared/Claude/wt/karttaseppa-postilaatikko), käsitelty 0a5b18041 asti.
2. Tarkista JU:lta jono. **Tarvitaan kolme ajoa sk:lla /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/sk-saari.txt (etäisyys 0,012):** f9e5cf79d → lokit/julkaisija-saari-f9e5cf79d (kone), b2ce1653f → lokit/julkaisija-saari-b2ce1653f (Codex), 626a3a68b → lokit/julkaisija-saari2-626a3a68b (ennen). JU sanoi 09.4x, että ennen-ajo odottaa PT:n herätystä. Kone- ja Codex-ajojen pyyntö oli sen jonossa, kun se aloitti vanhat, joten varmista, että ne ovat jonossa.
3. **Älä näytä KK:lle ajoja 147159e7a, 2266c5c0f, 32b990e83:** niissä Pont Neuf katkeaa (katuviivat pyyhkiytyivät). Ne ovat vanhoja.

## KK:lle luvattu
Ennen | jälkeen, neljä suuntaa ja ylhäältä, Mac, kumpikin tapa (kone ja Codex), yksi suositus kummasta tulee muiden kaupunkien tapa. D/parit.py <ennen> <jälkeen> <tulos> tekee parit. Katso täysikoossa ennen lähetystä. Katso erityisesti:
- Puu ei nimen päällä neljästä suunnasta (Sainte-Chapellen nimi on mallin vieressä; puut nyt latvus + 40 m SC:stä, latvus + 14 m kirkosta).
- Codexin kuvassa teiden ja nurmen liitokset ovat pehmeät neljässä kohdassa (katukäytävän alfareuna). Lupasin KK:lle katsoa ne pelikuvista.
- Kirkon jalan kaakkoisreunalla Codexin nurmikaista (1,4 %): näkyykö mallin vierestä.
- Kukkiva puu näyttää laikukkaalta kiveltä; hyväksytty malli, joten en poistanut sitä. Nosta KK:lle kuvien kanssa.
- Pienten katujen nimet saarella: ajon 147159e7a kuvissa ei näkynyt, mutta etäisyys oli iso. Katso 0,012:sta; pois tai väistävät (suunnitelma).

## Tila
- **Saari:** D/tee-pyyhitty.py (saari.png, lukko.png, pyyhitty.png, kone.png), tee-codex.py (Codexin väri kartan väreihin ulkopuolen pikseleistä), tee-puut.py (sääntö), tee-pala.py (Resources/NotreDameKoe/saari-pohja.png, Pala 100,258,938×670), tee-tilaus.py. Lukko = aukio + SC:n piha + katukäytävät. Kirkon jalka ei ole lukko.
- **Codex 23a:** toimitettu 709740c63 (kuitti 0a5b18041), sen oma kohdistus-QA ei läpäissyt; kone liimaa vain saaren sisäosan, joten ulkopuoli ja lukot ovat alkuperäisiä. Kuva posti/codex-karttaseppa-saari-23a-20261105/saari-uusi.png. Kuittausta ei ole lähetetty; seuraavasta otosta päättää KK.
- **Vaihto versioiden välillä:** b2ce1653f = Codex, f9e5cf79d = kone. Käytä: tee-pala.py ja D/asenna-puut.py puut-kone.cs.txt tai puut-codex.cs.txt.
- **Vyöhykkeet v6:** S/alueet/arkki-v6.jpg KK:lla. KK: omat pohjat Opéralle ja Panthéonille kelpaavat (yli 150 m). KK näyttää vyöhykkeet omistajalle saaren jälkeen. S/LUE.md:n rajarivi kuvaa v5:n: lisää v6:n säännöt (pitkä kortteli alle 50 % sisällä leikataan, peittämätön iso kortteli jää kartaksi, talo yli 50 % sisällä mukaan tai muuten pois, pienet_kadut ja avaus kohdekohtaisia). Montparnasse 0,06 km², lähin kartan rakennus 6 m. Sacré-Cœurin raja seuraa katuja pääosin.
- **Sarjan tilaukset eivät ole lähteneet.** Lähtevät, kun KK on nähnyt saaren tavan. Codex 21f (Louvre) ei ole tullut, saa jatkua.
- Työlistan rivi "Pariisin nähtävyyssarja" päivitetty 09.28; päivitä, kun parit ovat KK:lla.

## Opit
- Tumma kynnys vie myös katujen ohuet viivat: paksu rakennus erotetaan avauksella (binary_opening), ja kulkutiet suojataan käytävinä.
- Puun latvus peittää nimen, koska puut piirtyvät nimien päälle: katso nimet joka suunnasta.
- Yötilan rivi Postivahdin aloitusviestissä oli eilisillan (22.32): ei ole hyväksyntä.
