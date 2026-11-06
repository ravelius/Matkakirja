# Pelikoodari: luovutus 6.11.2026 klo 09.50: 19 lisäystä pintoja vasten, oven tekstuuri tilattu

Täydentää -0924:ää; sen kohdat 2.1 (seuraava ajo) ja OPIT pätevät, kohdat 2.2 ja 2.4 on korvattu tässä. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki yhä `81d3e839c`: pelikoodia ei muutettu eikä Unityä ajettu. Ei junaan. **Taso 1 on yhä pääasia.** Ei ajoa käynnissä.

Lukulista: periaatteet ja yhteiset kohdat luettu; luvusta 2 kohdat 2.177 ja 2.209 (2.177 alusta), luvut 4, 6 ja 12 lukematta. Seuraaja: katso oman työn kohdat haulla, koko luku 2 on 169 kt.

## 1. Tehty
- **19 lisäystä pintoja vasten:** `docs/raportit/viesti-pelikoodari-lisaykset-pinnat-20261106.md` (`1e27f9b4e`). 7 seinää tarvitaan, 3 pois, 3 lyhenee tai poistuu, 3:een riittänee raon tukko, 3 epäselvää. Korvaa 09.2x:n "18 PÄÄSEE". Kartasta, ei pelikuvia. LAV:lle lähetetty (jonossa lähetyshetkellä), PT kuittasi oikaisun.
- **Tilaus Codexille:** `posti/pelikoodari-codex-ovi-lehti-musta-tilaus-20261106.md` (`4beb6bf47`, postilaatikko-haara). PT:n päätös: musta täyte pois ennen vientiä, ei erillistä korttia. Toimitus `mallit-v2/` ja viesti `posti/codex-pelikoodari-ovi-lehti-v2-toimitus-20261106.md`.
- **Luku oikaistu tilauksessa:** aiempi "34,5 % mustaa" riippuu kynnyksestä. Mitattu nyt: täysin musta 13,6 %, alle 16/255 36,5 %. Karmissa ei täysin mustaa, ei kuulu korjaukseen.

## 2. Auki
1. **Kun `mallit-v2` tulee:** tarkista Codexin luvut ja rajaukset. Leivo `Resources/JuoksuOviLehti.png` uudelleen (`leivo-lehti.py <ovi-lehti-vasen.glb> <ulos.png>`, kopio alla): hämärän lehti on leivottu v1:stä, ja sama musta voi olla siinä (ei tarkistettu). Aja JU:n vuorolla kuva samasta kohdasta, **pari samasta kohdasta KK:lle ennen vientiä** (PT). Vienti on avoinna: `ovi-v1` puuttuu mediasta, ja korjattu malli on se, joka sinne viedään. Media-vienti muuttaa julkaistua: varmista viittaukset.
2. **Seuraavassa ajossa, jossa on `avaus nyt`:** peukalokohdat 14 % ja 86 % leveydestä, 70 % korkeudesta (`81d3e839c`, ei katsottu), kameran liike oven ohi (-0734 kohta 3.1).
3. **Kuva KK:lle** (ovi ja keisari): odottaa samaa ajoa; merkki mainitaan, jos v2 ei ole vielä mukana.
4. **LAV:n lista:** kun lista on valmis, kartta ja rajat uudelleen (-0004 kohta 2.1). Tukko raossa muuttaa karttaa samoin kuin seinä. Koko tason tarkastelu odottaa LAV:n vientiä. PK vahvistaa viittaukset ennen vientiä.
5. **Raportin heikot kohdat:** yksi rako mitattu per tasku, kaikkien rakojen luettelointi ei onnistunut (seinän vierusta on yhtä kapeaa kuin rako). 127 m²:n käytävän 0,75 m:n portti noin (-92,9; 335) on katsomatta kuvasta. Kolmessa kohdassa ristiriita LAV:n kuvien kanssa, LAV ottaa uudet.

6. **Unity b8 (NS, JU 09.47):** junarunko on b8:ssa (`julkaisija/runko-219-muisti` `addae63f2`). Yhdistä runko protoon, kun jatkat työtä; b7-haara kääntyy b7:llä siihen asti. Älä vertaa b7- ja b8-kuvia ilman merkintää. Tätä ei ole vielä tehty.
7. **LAV 09.5x:** kuvat-n tukee listaa: (-107,6) seinä 0,43 m linjan takana, (-100,2) avoin, (-163,5) ja (-113,1) sama pääte. Lista ei ole vielä lopullinen (kuvat-o, -p ja kolme kameraa tulossa). Karttaa ei ajeta, ennen kuin LAV kertoo.

## 3. Työkalut
`/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lisaykset-20261106/`: `arkki2-1.png`, `arkki2-2.png`, `arkki2.py`, `nakyvyys.py` (säde linjasta: kuljettava vai seinä, etäisyydet), `portit2.py` (pullonkaula pääalueeseen, huom. nauha ylittää seinät, käytä vain portin paikkaan), `leivo-lehti.py`. numpy ja scipy vain `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python`:ssa.

## OPIT
- Nauha linjan ympärillä laskee mukaan seinän takaiset ruudut: kulje säteellä ja pysähdy pintaan. Ensimmäinen vastaus "18 pääsee" johti LAV:ia harhaan.
- Pullonkaula mitataan pääalueeseen, ei lähtöruutuun: lähtöruudun oma leveys rajasi ensimmäisen ajon tuloksen.
- Piirrä ylhäältä ennen kuin vastaat: arkki kumosi luvut heti.
- Mustan osuus kuvasta riippuu kynnyksestä: kerro kynnys luvun kanssa.
