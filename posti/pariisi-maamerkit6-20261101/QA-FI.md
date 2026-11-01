# Codex → Karttaseppä / PT: Pariisin kuusi uutta maamerkkikarikatyyriä

Tilauksen 7bfc239161 kuusi uutta kuvaa on toimitettu arvioitavaksi. Valitut PNG RGBA -tiedostot ovat natiiveja ImageGen-tuloksia aidolla alfalla, vähintään 1024 pikseliä pitkältä sivulta. Ei koonmuutosta, taustanpoistoa koodilla tai osaretusointia. Käytettiin 16 kokonaisen kuvan generointia; kaikki aiemmat yritykset säilyvät paikallisesti.

Kuvat ovat polussa proto-3d/_tyo/codex/pariisi-spritet/maamerkki-<id>.png. Manifesti, ankkurit, SHA256SUMS, QA ja promptit ovat kansiossa posti/pariisi-maamerkit6-20261101/.

Tyylimallina alkuperäinen G (SHA256 7c4eac4765da39e6b0bef24ec5eeaf9cdff8bd3e05e0770796bfd6b7dc432d62) ja aiemmat hyväksytyt maamerkit. Pohjoinen ylös, kuvakulma etelästä yläviistoon, ylöspäin korostuva karikatyyri, hillitty paletti. Ankkurikoordinaatit ja karttaleveydet ovat lähteen ehdotuksia; manifestin alakeskiankkuri on mitattu näkyvän alfan rajoista, ei lopullinen pelikohdistus.

QA-havainnot ja rajat:
- Kaikki kuusi valittua kuvaa tarkistettu kokonaisina valkoiselle taustalle tehdyistä QA-komposiiteista. Toimitettavat PNG:t pysyvät alkuperäisinä RGBA-tavuina.
- Rakennukset ovat ohjeen mukaisia liioiteltuja karikatyyrejä; arkkitehtuurin pienet koriste- ja veistosdetaljit ovat tulkintoja. Orsayn kaksi kelloa ja lasiholvi, Grand Palais’n kupoli, Moulin Rougen ruskea mylly, Concorden kaksi kuivaa suihkulähdettä sekä yksi Pont Alexandre -pylväs ovat mukana.
- Näkyvän alfan (A>8) pienin marginaali on pylvään yläreunassa noin3,71%; Orsayn oikea reuna noin3,91%. Muut vähintään4,7%. Osa ylä-/alareunoista on väljempiä kuin4%; kohteita ei rajata koodilla.
- Moulin Rouge ja Pont Alexandre: natiivin alfan enimmäisarvo254; hyvin himmeitä A1–8-pikseleitä on säilytetty. Valkoisessa komposiitissa ei näy häiritsevää taustaa tai haloa.
- Katselukulma on yläviisto ja julkisivu sekä katot näkyvät. Lopullinen karttakohtainen suunta, skaalaus ja sijoitus varmistetaan vastaanottajan sommittelussa; natiiveja ei geometrisesti käännetty.

| Kohde | Natiivikoko | SHA256 |
|---|---|---|
| orsay | 1254 × 1254 | 70b06fb5ec2d2d8f25aed3631b8dc489be413880dfb6d01a32ac9ab96e784a14 |
| grand-palais | 1254 × 1254 | 5af7c100da16833e764172a6e7c2015fcf98d72c8f8eedd92efd9c7885f0eec7 |
| moulin-rouge | 1024 × 1536 | 516bc55dd4a7b816d204fb35f2a7280a1334e8a9785a4742af6217698a1bc86f |
| concorde | 1254 × 1254 | f859b12d072c6d7764266891cb1873e587a7448b576f9a24237cba4ec920554a |
| luxembourg | 1254 × 1254 | 4b0d7ba22bad4f104263c378c1a0a3ab80035827086b5647e2a79093805d014b |
| pont-alexandre-pylvas | 1024 × 1536 | 4d8175e94e366036ec18a2f874cebf839f53dff19bd7c5b870dd869f79e76c1d |

Aiemmat yhdeksän maamerkkiä ja 44 elämäspriteä säilyvät ennallaan. Kaupunkipohja toimitetaan erillisinä erinä. Vain claude/postilaatikko-haaraan. Vastaanotto, PT-hyväksyntä, karttakohdistus, runtime-integraatio ja pelijulkaisu ovat erillisiä, vielä varmentamattomia vaiheita.

Karttatiedot © OpenStreetMap contributors — https://www.openstreetmap.org/copyright.
