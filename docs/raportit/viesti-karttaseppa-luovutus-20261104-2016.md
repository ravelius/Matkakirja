# Karttaseppä: luovutus 4.11.2026 klo 20.16 (KS)
Syy: konteksti 25 % (7.37). Korvaa kaikki aiemmat 4.11. luovutukset, paitsi jonon suunnitelma alla. Python: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. A = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-alueet-20261104. Worktree /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, varmuuskopio natiivi-backup (origin-remoteä ei ole).

## Omistaja ja KK
- **Omistaja 19.01:** kirkko hyvä, tornien kallistumaa EI korjata. Harmaa laikku on VS:llä.
- **Omistaja 19.03:** Louvre ja Sainte-Chapelle samalla valolla kuin kirkko ja mallin omilla väreillä; muut 3D-merkit pysyvät ruskeina.
- **Omistaja 18.27:** Louvre ja Sainte-Chapelle seuraavaksi; lähekkäisille yhteinen pohja ja omat mallit; erilliset puut, ei 3D-maastoa.
- Kuvat ensin KK:lle. Ei junaan.

## ENSIN: seuraava askel
1. **Vahti on kuollut nollauksessa: käynnistä Monitor** (fetch origin claude/postilaatikko 60 s välein, /Users/Shared/Claude/wt/karttaseppa-postilaatikko). Käsitelty bb8441149 asti.
2. **Louvre 21a Codexilla** (tilaus 6559b971a, _tyo/codex/pariisi-louvre-20261104/TILAUS-21a-kuvat.md, Codex aloitti pelikulmasta bb8441149). Kun kuvat tulevat `_review-pohjakuvat/`: tarkista SHA ja mitat, katso kaikki, polut KK:lle. **Älä avaa Tripoa ennen KK:ta.** Mitat 860 : 360 : 100 : 170 : 300 ovat oma ehdotukseni k5:stä mitattuna (sivukuva 1,6 px/yksikkö); KK ei ole vielä nähnyt niitä. Sitten Tripo (mallina TILAUS-19b-k2-tripo.md) ja pohja-alue. Kaksi epäonnistunutta ottoa → omistajalle ennen kolmatta.
3. **Louvren pohja:** ND:n pohja ulottuu lännessä noin pituudelle 2,3385 ja pohjoisessa leveydelle 48,8599, joten se voi osua Louvren itäpäähän: tarkista jalanjälki ennen pohjatilausta (NAHTAVYYSALUE.md:tä ei löytynyt haullani, etsi kirjastosta).
4. **C Sainte-Chapelle:** aloittamatta. Pohja jatkuu ND:n palasta, toinen malli samaan alueeseen (Maaritys.Mallit).

## Tehty: osa A, d45cad639
NotreDameKoe.cs → Nahtavyysalue.cs. Maaritys-taulukko (Alueet), alueella yksi pohja ja monta mallia, ensimmäisen mallin jalka on ankkuri. Vapautus kaaren 0,4° takana, lataus enintään yksi alue ruudussa. Puut yhteiset, vapautuvat viimeisen alueen mukana. Nimikerros: KeraaRuudut + Peittaa. Resources-kansio on yhä NotreDameKoe/, Ruutusyy-nimi "NotreDameKoe".
**Mac-ajo lokit/julkaisija-nahtavyysalue-d45cad639 (5/5):**
- k-0012, s-270 ja palasi-y-0012 vastaavat 8be6819db:tä: kirkon alueella eroa 0,2–0,3 %, muu ero nimiä ja lintuja. Kuvat katsottu: k-0012 vierekkäin, palasi-y-0012 pienenä; s-270 vain erotusluvuista.
- Lokissa `koe luotu` → `vapautettu` kahdesti ja uudelleenlataus toimi; pois-08:ssa ei pohjaa eikä kirkkoa.
- **y-0012-puut on mitätön:** kuva on Ranskasta, koska sk-nahtavyysalue.txt:n ensimmäinen `aja` ei ehtinyt (poistin odotuksen). Skriptin vika, ei koodin.
- POIKKEUS on Unityn Search-indeksi (SearchDatabase), ei meidän.
- **Ei mitattu:** muistin vapautumista ei ole mitattu luvuin, usean mallin alue ei ole kokeiltu (Louvre/Sainte-Chapelle koettelevat), iPadia ei ajettu tällä koodilla.
- KK:lle ja PT:lle ei ole vielä kerrottu Mac-tulosta: tämä kuuluu rivinä seuraavan mukana.

## Tehty: iPad 8be6819db
lokit/julkaisija-nd-ipad-8be6819db, 12/12, 3264 Mt, 0 varoitusta. Taivaan vene poissa, k-013 ilman rajaa (Macin kuvien piirre, oletus pieni ruutu), mittakaava y-0012 0,994 (y-0036 epäluotettava). KK:lla ja PT:llä. ele-60, suorista ja loppu katsomatta. Veneen korjaus on koe; omistajan kuvaan vietävä pitää poimia omana muutoksenaan. Kukkiva Macilla vaimea, hieman harmaa.

## Jono ja odottavat
- Suunnitelma: Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-lisaa-nahtavyyksia.md (A tehty, B, C; D iPad JU:lta, kun A ja vähintään yksi malli kasassa). Eiffel oma kortti.
- Seis ilman sanaa: tasankopoltto (PT); nimet 79186922b ja ed711573d kääntämättä; Karsi, Vincennes, Boulogne, minor-nimet ja puut 43ba52fe7 odottavat pelikuvia.
- Mac- ja iPad-ajot vain JU:n vuorolla. OpenFreeMap-haut kielletty.

## Opit
- Tarkista generoitu C# ennen JU:n vuoroa: Unityn `Resources/Scripting/DotNetSdk/dotnet` + `sdk/10.0.303/Roslyn/bincore/csc.dll` -nostdlib, suodata CS1xxx. 48e4a5921 kaatui ylimääräiseen aaltosulkeeseen.
- Ajoskriptissä pidä `odota` ennen ensimmäistä `aja`-komentoa.
- JU ei vahdi rivejä puolestasi: vahti Macin ja iPadin lokit itse tai odota JU:n riviä.
