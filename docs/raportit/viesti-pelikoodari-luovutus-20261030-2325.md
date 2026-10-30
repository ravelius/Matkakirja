# Pelikoodari: luovutus 30.10.2026 klo 23.25 (PT: konteksti 25 %)

Edellinen: -20261030-2245 (+ lisäys). Muistin tila: pelikoodari-tila-20261018-aamu.md.
P2 = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/leivonta-217; proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-v98c.

## Valmista (PT kuitannut)
- **Kuja 02, vasen muuri (2a):** ei vikaa junassa. Klo 21.48:n ajo tehtiin REF:llä 00e19dfb0, joka on ennen kaksipuolisuuskorjausta e0658fd3c
  (V4_red doubleSided). Raportti 8f616c157 (PR 5680).
  - Kuvavarmistus: puupari-v12:n `v2-02-peli` rungosta 782e348cf näyttää molemmat muurit kokonaisina.
- **Kuja 02, puut (2b):** lahipuut-v12 kuitattu.
  - Poistettu 249 puuta kujien lattialta. Muurien takana olevat jäävät (omistaja 24.10. 02.38).
  - Kuja-40:llä haku ulottuu 6 m:iin, koska kujaa on levennetty.
  - 9 epävarmaa jää paikoilleen (PT).
  - Proto 290624e19 (haara pelikoodari/lahipuut-v12-216, pohjana 782e348cf).
  - Paketti `proto-3d/_valmiit/juoksupeli-kk-pelikoodari-lahipuut-v12-vienti-20261030` → JU vie NS:lle junaan 216.
  - Raportti ja kuvapari: 2ff9d0ee9 (PR 5688). Kuvat ovat kansiossa `piirrokset-20261030/puut-v12/parit/`.
  - **Tarkista:** NS ottaa 290624e19:n mukaan junaan 216 (vain kansionimi v11 → v12).

## Kesken: leivottu valo (junaan 216)
- **PT 23.2x: ÄLÄ AJA kerroin 3 -koetta vielä.** VS:n mukaan leivonnalla ei ole juuri-216:ssa vaikutusta (päällä = pois), ja VS selvittää atlaksia.
  Odota VS:n korjausta ja PT:n lupaa.
- Koehaara on valmiina: **pelikoodari/koe-valo-k3 b0cf29e42** = oma leivonta 45b5492df + VS valo-216 02953bc6e (editorikaappauksen varjokorjaus).
  - Ristiriidat: varjostimissa VS:n float4, Muurikate.cs:ssä oma leivontakytkentä (sisältää VS:n varjo-parametrin), Palatsi.cs:ssä VS:n kommentti.
  - Jos VS:n korjaus tulee uutena committina, yhdistä se tähän haaraan tai rakenna haara uudelleen.
- Proto-worktree on nyt haarassa **koe-valo-k3** (esikatselu.sh kopioi Esikatselu.cs:n worktreestä, joten ajettavan haaran on oltava checkoutattuna).
- Ajo, kun lupa tulee: **kaksi ajoa**. Vanhat valo0-kuvat on otettu ennen varjokorjausta, joten valo0 ajetaan uudelleen.
  - `zsh /Users/Shared/Claude/wt/proto-pelikoodari-v98c/tyokalut/esikatselu.sh pelikoodari/koe-valo-k3 P2/skenaariot/koe-valo0.txt ipad --batch`
  - Sama komento skenaariolla `koe-valo1k3.txt`.
  - Yksi Unity kerrallaan, linja 2. Sovi vuoro VS:n kanssa (local_3b36fe96-0199-4b17-9eb4-46a882ce7399).
  - Levyvahti: `scratchpad/levyvahti.sh` oli kertakäyttöinen. Pysäytä ajo, jos levy < 82 Gi.
- Vertaa valo1k3:a valo0:aan: jos seinät kirkastuvat, atlas toimii. Tarkista sitten varjokuvio Blenderin `tarkistus-r_-3_-5-a/b.png`:tä vasten
  (1b: väärä kuvio → oy' = 1 − sy − oy).
- LAV:n v6-paketti (osasarja-v6 + UV1 + valo.json) valmistuu ketjussa aamupäivällä 31.10. Sitten toimi -2210:n kohdan 2 mukaan.

## Huomiot
- esikatselu.sh: vieras REF kaatuu käännökseen, jos worktreen Esikatselu.cs viittaa REF:stä puuttuvaan (esim. `OsasarjaAtlasKesken`). Checkoutaa ajettava haara ennen ajoa.
- Junan 216 rungossa 782e348cf ei ole QA-ortoa. Puuparissa se cherry-pickattiin (84b4db5b1, a50a8cb7f) haaroihin pelikoodari/puupari-v11 ja -v12. Ne ovat vain koetta varten.
- v11-ajon pelikuvat jäivät korkealle yleiskuvaan (sijoita meni läpi, kamera ei laskeutunut), mutta v12-ajossa ne olivat oikein. Syytä ei ole selvitetty.
- `Peli-testit/Testit/ZDiagKuja02.cs` on worktreessä committoimatta (diagnoosi, voi poistaa).
