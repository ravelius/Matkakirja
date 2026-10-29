# Natiivi-UI: luovutus 29.10.2026 klo 00.30

Edellinen: viesti-natiivi-ui-luovutus-20261028-2312.md.

## Valmiit (junassa 214)
- TF 213 -bugit 3 ja 4: 408d80914 on junan 214 rungossa 4ab6ecdf7.
- Nähtävyysarkki (KK 22.57, PT OK 23.5x): 4192cf990 on rungossa fcd98470d.
  - Kulman ☰ ei ollut pelin nappi vaan arkin oma "Kaupungin nähtävyydet" -lista. Se on nyt pin-kuvake
    (Ikonit.Viiva pin, sama OHJAUSNAPPI-pohja), ja ☰ jää vain lukijan valikolle.
  - Kartan suurennuslasi pilkotti iPhonella arkin oikean yläkulman takaa. Karttaselite.ArkkiPeittaa piilottaa sen arkin
    ajaksi (NostoPeittaa-mallilla, oma lippu).
  - Tuplajohdanto: napautus avasi jutun kahdesti ennen ajastettua taittoa, ja molemmat taitot ajettiin. Nyt taittaa vain
    viimeisin avaus (Nahtavyysarkki.taitto-versio). Loki: "nähtävyys: taitto <nimi>, N osaa".
  - Simu iPhone: todistus-arkki-{ennen,nyt}-iphone-20261028-2329/2333 ja todistus-sauma-{ennen,nyt}-iphone-2338/2342.
  - Parit: _tyo/natiivi-ui/arkki-tuplat/pari-P1-pin-lasi-iphone.png ja pari-P2-tuplajohdanto-iphone.png.

## KESKEN: kohdenostojen nimiöt (PT 23.5x ja 00.1x), PT OK 00.2x, merge-pyyntö NS:llä
Haara natiivi-ui/nostonimet-214, kärki 616d4b6e0:
- Pohja juna-214 29f5a68c7 (ff).
- Peili: natiivi-backup peili/proto/natiivi-ui/nostonimet-214.
- Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-nostonimet.

Muutos (NostotKartalla.KohdeNimionKatto, NimioFs):
- Pallotasolla ≤ 12,5 nimiö on enintään 12 pt, joten Bastilji ei ole enää Pariisia isompi.
- Tasolta 13,5 nimiöllä on entinen koko 16–22 pt. Välissä raja nousee tasaisesti.
- Piirros ja sen väli nimiöön pysyvät ennallaan.
- `ui kohdenostot` kertoo nimiön koon.
- 5dd7276c0 (kiinteä 12 pt) hylättiin: katutasolla nimet hukkuivat katujen nimien sekaan.

Todennus:
- Simu, iso iPad: todistus-nostonimet2-{ennen,nyt}-ipad-20261029-0016/0020.
  - Taso 12,2: 12 pt. Taso 12,8: 15,4 pt. Taso 13,8: 22 pt.
- Parit: _tyo/natiivi-ui/nostonimet/pari2-{K1-kuntanimitaso,K2-valitaso,N1-pariisi-keskella}.png.
- Ajo: `zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/nostonimet/ajo-pari.zsh` (vain JU:n SIMU NYT:sta).
  Ennen-puoli käyttää KS:n appia f897c88b.

Seuraavaksi:
1. NS kertoo rungon SHA:n.
2. Sen jälkeen worktree proto-natiivi-ui-nostonimet pois: `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove …`.

## Opit
- JU:n tarkista.sh sisältää liikevahdin: Mathf.Lerp ilman merkintää "// liikepoikkeus: syy" kaataa käännöksen.
  Aja `zsh tyokalut/tarkista.sh` ennen käännöspyyntöä.
- Linssit-testit/unity-tarkistus.sh on sh-skripti, ja zsh:lla ajettuna optiot eivät pilkkoudu. Aja sh:lla.
- Editorin batch-esikatselu 640 px:n koossa ei osu kohdenostomerkkeihin (napautus osui matkakirjakorttiin).
  Kohdenostojen kuvat otetaan simulla.
- KS:n kartan nimikoko ("12 pt") on kartan viitekoko ja kasvaa zoomissa. UI-nimiön pt on ruudun koko.
