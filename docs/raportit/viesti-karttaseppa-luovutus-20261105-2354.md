# Karttaseppä: luovutus 5.11.2026 klo 23.54 (KS)
Syy: konteksti 32 %, luonteva tauko, koska KK päättää kuvista (7.37). **Voittaa -2335:n ristiriidassa; -2335, -2329 ja -2207 ovat tausta.** W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki e726bba9f (tarkista `git log`). Python `/opt/homebrew/bin/python3`. Testit `/bin/bash <W>/Kartta-testit/kaanna.sh PariisiKallistus`, 13/13. Lukko vapaa, ajoa ei käynnissä. Yötila: KK tai PT hyväksyy omistajan sanoja vasten.

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`. Oma a2fdcdd3d ohitetaan.
2. KK:n vastaus viestiin 23.52 (kohta "KK:LLA").

## TUMMUUS: SYY TODISTETTU, KORJAUS KOKEESSA (omistajalle luvattu, KK:lla)
Ajo `lokit/esikatselu-20261105-234647` (76b9b0c38, L2, 208 s, 5/5 kuvaa). Riemukaari samasta kamerasta: vanha varjo mediaani 117, uusi 165. Loki vanha: Notre-Dame 42619 × 12786, Sainte-Chapelle 65636 × 19691, Louvre 5035 × 1510; uusi 184 × 55, 97 × 29, 489 × 147.
- **Syy:** nähtävyysmallin maavarjo (`Nahtavyysalue`, jono 2994) kertoo kartan, ja koko tuli `Karttaesineet.RuutuRajat`:n projektiosta. Kun rajauslaatikon kulma on lähellä kameran tasoa, koko kasvaa rajatta; kameran takana koko jää voimaan. Kaikki Pariisin alueet ovat ladattuna samaan aikaan. Mallit (3080), nimet (2995+) ja taivas piirtyvät varjon jälkeen, joten ne eivät tummuneet.
- **Lukujen tuki:** NS:n Marais 238/206/159 → 179/153/116 = lineaarisena 0,527/0,517/0,50; yksi varjo (peitto 0,5, muste #46331F) antaa 0,53/0,516/0,507.
- **Korjaus:** `Nahtavyysalue.AsetaMallinVarjo` laskee koon mallin mitoista juuren syvyydellä; kameran takana koko 0. Komento `maavarjot` kirjaa koot lokiin. Lippu VanhaVarjo poistettu e726bba9f:ssä, jota ei ole ajettu.
- **iPad:** sama koodi, joten koskee sitäkin; iPadilla ei ole ajettu. NS:lle kerrottu (talot jonossa 2994, 22f6538a9: siirto 2995:een, jos jäävät varjon alle).

## KK:N PÄÄTÖKSET 23.52 (voittaa alla olevan "KK:LLA"-osan)
- **Tummuus** kelpaa kokeena. KK näyttää parin omistajalle aamulla ensimmäisenä. Junaan vain PT:n kautta.
- **Katto v3 EI kelpaa:** tilkut poissa, mutta katkoviiva näyttää viasta eikä kiveykseltä, ja kerrokset voivat väristä kameran kiertäessä. **Tee:** poista saumakerros kokonaan tai vie saumat mallin kuvaan; keskikohouma jää. Ei Tripolle. Kuva seuraavasta ajosta KK:lle.
- **Opéra** kelpaa kokeena. Pystysauma ei ole alustan vika.
- **Eiffel** kelpaa kokeena. Nurmi katsotaan korjattuna e726bba9f:stä seuraavasta ajosta; **Codexille saa kuitata, kun nurmi kelpaa** (KK:n sana kuvasta).
- **Leijuminen:** jatka mittausta. Tavoite omistajan 21.28: rakennus näkyy kartan rajalla pohjansa päällä. **Kerro KK:lle, jos ratkaisu muuttaisi horisontin paikkaa:** omistaja 20.25 "Kauemmas", 21.30 "Horisontti on vähän turhan jyrkkä".

## KK:LLA (viesti 23.52, vastattu yllä)
1. **Riemukaaren katto v3:** tilkut poissa (`_tyo/karttaseppa/alustat-24p/riemukaari-katto-v3-rajaus-234647.png`). Syy oli kolme päällekkäistä kerrosta (Y 175,10 / 175,14 / 175,19). `sarja24-asennus/riemukaari-katto-kerrokset.py` laski kannen 173,96:een ja saumat 174,25–174,28:aan. Pinnalla hienoa katkoviivaa. **Tripolle EI mitään ennen KK:n sanaa** (Mallin hyväksyntä KK:lta).
2. **Opéra vaaleassa kartassa:** `opera-45.png` ajokansiossa. Codexille kuitattu kokeena a2fdcdd3d (Invalidit, Panthéon, Grand Palais, Opéra). Eiffel, Sacré-Cœur, Montparnasse odottavat pelikuvaa.
3. **Eiffelin nurmi:** `eiffel-45.png` 178,160,90, kartan Luxembourg 196,172,108: erottui, KK:n ehto täyttyi. `sarja24-asennus/eiffel-nurmi.py` + `asenna-24p.py` asennettu e726bba9f, **ei nähty pelissä**. Invalidit ja Grand Palais jäävät nykyisellään (KK).

## LEIJUMINEN: AUKI, seuraava työ (KK 23.3x kohta 4 ja 23.38; omistaja 21.28: rakennus kartan rajalla pohjansa päällä)
Kuvat: `lokit/esikatselu-20261105-234647/pantheon-45.png` yläosa ja selvempi `lokit/natiiviseppa-marais-30e34cc9e/k3-keski-180.png`: kaksi puuriviä ja Sainte-Chapelle taivaalla kartan rajan yläpuolella, puut terävinä.
- **Kokeiltu, ei kelpaa, kumottu e726bba9f:** `NotreDamePohja` mallin usvassa (`_UsvaKohde`). Sainte-Chapelle jäi leijumaan, ja pohjista tuli teräviä saaria usvaan (`alustat-24p/pari-leijuminen-ennen-jalkeen-234647.png`). Älä toista.
- **Havainnot koodista, ei mitattu:** puut käyttävät koko alueen ensimmäisen mallin usvaa (`PaivitaUsva`, `ensimmainen`), joten Sainte-Chapellen puut seuraavat Notre-Damea. Malli käyttää `PariisiKallistus.Sumu`:n alkua ja karttaa `KartanSumu`:a; raja on sama `RuutuLoppuM`, mutta k3:ssa kartta on täysin usvassa syvyydellä, jossa malli näkyy. Mittaa ensin: `KohdeUsvaPeitto` jalasta, `RuutuAlkuM`/`RuutuLoppuM` ja kartan todellinen peitto samasta kohdasta. Unityn sumu voi tulla muualta kuin raja-arvosta (`linssiLisa`, `Horisonttiusva.Sumu`).
- **Rajaus:** omistaja 21.30 ei halua rakennuksen häipyvän kartan pitkällä liu'ulla, joten pelkkä mallin aikaisempi häivytys voi rikkoa sen; kysy KK:lta ennen sitä.

## SEURAAVA AJO (pyydä JU:lta, "ratkaisee", enintään noin 5 kuvaa; L2 jos sama sk)
Eiffel korjatulla nurmella (`sk-pariisi-varjo.txt`:n kamera) + leijumisen koe. Skenaario sisältää `maavarjot vanha/uusi`-rivit; argumentti ei enää tee mitään, poista ne. Vertaa Eiffel `omistaja-20261105/eiffel-maa-puuttuu-2132.png`. Tarkista generoitu C# ennen vuoroa: komennon nimi `varjot` oli jo käytössä, ja ajo kaatui CS0152:een.

## TYÖJONO
1. Katon saumat (KK, seuraavaan ajoon). 2. Leijuminen. 3. Pystysauma (PT, -2128 kohta 2; näkyy `opera-45.png` noin x 770–830 / 2000 px). 4. Sacré-Cœur pelissä (`sc-suunnitelma.md`) ja Montparnasse. Muu kuten -2207. **Yhdistettäessä:** NUI:n jousi (natiivi-ui/liikevahti-219 cbc744e21) voittaa PariisiKallistuksen rivillä. Kaikki kokeena, ei junaan.
Opéran kuvan alareunassa näkyy Louvren katon reuna (malli on oikeassa paikassa kameran alla); ei tutkittu.

## Opit
- Jos vain osa kuvasta tummuu ja muu ei, etsi piirtojärjestyksestä kerros, joka kertoo: lineaarinen suhde kanavittain paljasti varjon musteen.
- Kertova kerros ruutukoosta on vaarallinen: projektio kasvaa rajatta kameran tason lähellä. Koko mallin mitoista.
- Komennon nimi ennen ajoa: `git grep 'case "nimi"'`.
- Älä kirjoita `git checkout <sha>` tutkimuskomentoon: siirsin työpuun hetkeksi 1df82634d:hen; palautettu, ei menetystä.
