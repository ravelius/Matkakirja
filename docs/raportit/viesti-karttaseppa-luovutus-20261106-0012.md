# Karttaseppä: luovutus 6.11.2026 klo 00.12 (KS)
Syy: konteksti 30 %, luonteva tauko, koska KK ja JU vastaavat (7.37). **Voittaa -2354:n ristiriidassa; -2354 on tausta (tummuus, opit).** W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 3834ea09b (tarkista `git log`). Python `/opt/homebrew/bin/python3`. Testit `/bin/bash <W>/Kartta-testit/kaanna.sh PariisiKallistus`, 13/13. Kaikki kokeena, ei junaan. Yötila: KK tai PT hyväksyy omistajan sanoja vasten.

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.
2. KK:n vastaus viestiin 00.10 (kohdat 1 ja 2 alla). JU:n vuoro: 3834ea09b, `_tyo/karttaseppa/sk-pariisi-tasainen.txt`, 12 kuvaa, pyydetty 00.10; KK: ei omaa ajoa, muut nähtävyydet saavat mennä edelle. Varjostin muuttui, joten L2 ei ehkä riitä; varjostinta ei ole ajettu Unityssä.

## KK:LLA (viesti 00.10)
1. **Riemukaaren katto v4:** katkoviiva poissa, pinta tasainen kahdesta kulmasta (`alustat-24p/pari-katto-v3-v4.png`, `riemukaari-v4-b-rajaus.png`). Katto hieman harmaanvihreämpi kuin runko; voi lämmittää kuvassa ilman Tripoa, jos KK haluaa. Tripolle EI mitään ennen KK:n sanaa. Skripti `sarja24-asennus/riemukaari-katto-saumat.py` (v3 → `alustat-24p/riemukaari-v4-peli.glb`), asennettu.
2. **Eiffelin nurmi:** `lokit/karttaseppa-leijuminen-b9ea3e0db/eiffel-45.png`. **KK:n sanasta kuittaa Eiffel Codexille** (posti `Karttaseppä →`, postilaatikko-haara).

## LEIJUMINEN (KK ja omistaja 21.28: rakennus kartan rajalla pohjansa päällä)
Ajo `lokit/karttaseppa-leijuminen-b9ea3e0db`, pari `alustat-24p/pari-puut-usva-k3.png`.
- **Puut, korjattu ja nähty (b9ea3e0db):** kaikki alueet kirjoittivat `_Usva`:n yhteiseen staattiseen `puuAine`:een, joten viimeksi päivittynyt alue määräsi. Nyt lohko puukohtaisesti oman jalan mukaan, ja usvattomat puut pysyvät erässä. Ylin rivi on poissa.
- **Mitattu k3 (`usvamitta`):** alku 1760, kohdeAlku 2062, loppu 2391; Unityn sumu sama, mitta 1,000. Sainte-Chapelle: syvyys 2326, kartta 0,90, kohdePeitto 0,80, mutta malliUsva 0,00.
- **Syy (3834ea09b, EI ajettu):** `PaivitaUsva` ja `MalliKyltit` antoivat usvalle `Sovita(90)` = 180 m, vaikka malli on 90 m:ssä. Jalka näytti 45°:ssa 59 m lähemmältä. Korjattu usvan osalta; kyltin ruutupaikka tahallaan ennallaan. Laskelma: täysi malli kartan peitolla noin 0,79, ennen 0,88; Sainte-Chapelle k3:ssa peitto noin 0,74.
- **Katso seuraavasta ajosta** k3 ja Panthéon + usvamitta, pari KK:lle. Jos ei riitä: mallin häivytyksen aikaistus tai alun siirto, mutta **kysy KK:lta ensin** (omistaja 21.30 ei halua pitkää liukua; 20.25 ja 21.30 horisontti).
- Älä toista: pohja mallin usvassa (saaria, -2354).

## TASAINEN KARTTA, KOE (KK 00.05 ja 00.1x; oletus pois, ei junaan eikä NS:n haaraan; omistaja päättää, KK näyttää parit kortilla)
- Syy: maastopalojen (z12, x-raja 4149 = 2,3291) reunat eroavat enintään 9,5 m, kertoimella 19 m; sama muilla rajoilla (2,2852: 7 m, 2,3730: 9,5 m), rivit vaihtelevat 0–9,5 m. Mitattu ämpärin 2026-10-29-maailma-paloista; korkeudet kertoimella: ND 82, Louvre 146, Opéra 140, Tuileries 70 m; mallit 90 m.
- Koodi 637444ed4 + fb45a72c0: `KorkeusKerroin.Tasainen`, komento `karttatasa 0|1 [säde reuna korkeus]`, oletus 10 km / 14 km / 90 m, reikä Montmartre 48.8867, 2.3431, 700 m + 700 m reuna. Varjostin: `tee_tileset.py` ja suoraan `.shadergraph` (_maaTasaKeski, _maaTasaRajat, _maaTasaReika; paino 0 = täsmälleen ennallaan). Generaattoria EI ajettu, kaavio paikattu samalla sisällöllä.
- Parit samasta kamerasta: sauma, Montmartre 45° ja 80°, Seine, alueen raja idässä (12 km). Sacré-Cœurin mallia ei ole pelissä eikä NS:n taloja haarassa; sanottu KK:lle. Tarkista parista myös sillat ja nimet, jos jokin nojaa näytteistettyyn maastoon: Tasainen ei muuta C#:n maastonäytettä.

## TYÖJONO
1. KK:n sanat. 2. Ajon parit KK:lle. 3. Sacré-Cœur pelissä (`sc-suunnitelma.md`) ja Montparnasse. Muu kuten -2207. **Yhdistettäessä:** NUI:n jousi (natiivi-ui/liikevahti-219 cbc744e21) voittaa PariisiKallistuksen rivillä. Opéran kuvan alareunan Louvren katon reuna tutkimatta.

## Opit
- Yhteisen staattisen materiaalin arvon kirjoittaa viimeksi päivittynyt olio; jos oliot ovat kaikki ladattuna, arvo tulee väärältä alueelta.
- Korkeuskerroin kuuluu vain maastoon: mallin oma korkeus ilman `Sovita`:a. Sama virhe piiloutuu, kun depth-ero on pieni matalassa kulmassa.
- csc Unityn beetalla: `Resources/Scripting/DotNetSdk/dotnet` + `sdk/*/Roslyn/bincore/csc.dll`, viitteistä pois `UnityEngine.MathematicsModule`; muissa tiedostoissa jää 208 ympäristövirhettä, joten suodata omat tiedostot. Tämä ei kata varjostinta.
