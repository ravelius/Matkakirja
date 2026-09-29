# Linnanrakentajan luovutus 29.9.2026 klo 03.1x (konteksti 62 %, erät 0 ja 1 valmiit)

Rooli: **Linnanrakentaja (Opus, max)**. Päätoimittaja (local_8d8ebf72…) johtaa. Tehtävä: elävä linna eli
Poikkileikkaus-linssi (id `poikkileikkaus`, moottori "dioraama"). Lue ensin
`docs/raportit/linnanrakentaja-suunnitelma-20260929.md` (tavoite, arkkitehtuuri, tarvelista, erät) ja
`docs/raportit/linnanrakentaja-era1-20260929.md` (mitä on tehty, puutteet).

## Haarat ja työtilat

- **Roolin checkout:** `/Users/Shared/Claude/Matkakirja-linnanrakentaja`, haara `linnanrakentaja-tyo-20260929`
  (suunnitelma, erän 1 raportti, kuvat, Codex-tilausluonnos).
- **Pelin repo:** worktree `/Users/Shared/Claude/wt/linnanrakentaja-keittio`, haara `linnanrakentaja-keittio` aa8b1dc01.
  - `js/dioraama/` (data ja logiikka), `tools/dioraama/` (rakennuskone), testit `tests/dioraama-*` 104/104.
  - Rajapintaspeksi: `docs/raportit/dioraama-rajapinnat-20260929.md`.
  - Ei PR:ää vielä, koska pelistä ei viitata tiedostoihin.
- **Proto-git:** worktree `/Users/Shared/Claude/wt/proto-linnanrakentaja-keittio`, haara `linnanrakentaja/keittio` 474df855.
  - Sisältö: `Linssit/Ydin/Dioraama/`, `Linssit/Unity/Dioraama*`, 2 varjostinta ja `UI/Linssit/DioraamaTaulu.cs`.
  - Yhteiset tiedostot: `LinssiOhjain.cs` +3 riviä, `LinssiUi.cs` +2 riviä.
  - Testit: Linssit-testit 414/414 ja unity-tarkistus 0 virhettä.
  - **Ei merge-pyyntöä ennen ämpäriä** (kohta 3).

## Käytännöt, jotka opin

- **Käännös- ja simulaattorivuorot kulkevat Julkaisijan kautta** ("NYT"). Ilmoita "sammutettu".
  - Käännös: `proto-3d/tyokalut/linnanrakentaja-ajot/kaanna.sh <nimi> linnanrakentaja/keittio`. Kestää noin 5 min,
    ja `.app` sekä `.metat` menevät scratchpadiin.
  - Ajo: `ajo-poikki.sh`. Muuttujat: APPNIMI, UDID, LAITE (iphone|ipad), KIERTO=vaaka, L (lokikansio) ja VAIHEET
    (1 käynnistys, 2 kuvat, 3 video, 4 kierto, 9 sammutus). Kesto noin 2,5 min laitetta kohden.
  - Kuvien merkintä: `merkitse.py`.
- **Omat simulaattorit:** Linnanrakentaja-iPhone 3AA8F853 (iPhone 17 Pro) ja Linnanrakentaja-iPad F75C92E7
  (iPad Pro 13 M5). Aja yksi kerrallaan, ja sammuta heti. iPadin kuvat tallentuvat pystyyn, joten ne kierretään 90°.
- **Kehityspeili:** linssi lukee oletuksena `file:///Users/Shared/Claude/wt/linnanrakentaja-keittio/dist/dioraama/olavinlinna/`.
  - Paketti tehdään komennolla `node tools/dioraama/rakenna.mjs olavinlinna` (noin 3 s). Uudelleenkäännöstä ei
    tarvita, kun muutos on vain datassa.
  - Kun paketti on ämpärissä, `DioraamaSovitin.OletusPeiliJuuri` poistetaan (peili = identiteetti).
- **Sonnet-agentit:**
  - Ohjeista kirjoittamaan tiedostot ≤ 150 rivin paloissa. Isot yhden kerran tiedostot kaatuivat tulosterajaan
    (rakennuskone ja kaksi reseptiagenttia).
  - Rinnakkaistyö onnistuu, kun rajapintaspeksi on tarkka.
- **Pallo piiloon:** `SyoteLukko.LisaaNakymaPeitto` hoitaa pallon piilotuksen.
  - Dioraama piirtyy RenderTextureen (`DioraamaNayttamo.Kuva`), jonka `DioraamaTaulu` näyttää kerroksessa
    `LinssiUi.MustaKerros` (24).
  - Kulman Pulu piilotetaan `Pulu.Hae().Nayta(false)`-kutsulla.

## Seuraavaksi (erä 2)

**Kesken luovutushetkellä:** Sonnet-agentti tekee proto-worktreehen syväterävyyden (Volume + Gaussian DoF kerrokseen 9,
komento `poikki dof 0|1`) ja taulun marginaalin Pulun viereen. Muutokset ovat commitoimatta: tarkista `git status` ja
unity-tarkistus, commitoi, ja käännä vasta sitten Julkaisijan vuorolla.


1. **Julkaisija vie paketin ämpäriin.** `dist/dioraama/olavinlinna/` → `media.matkakirja.app/dioraama/olavinlinna/`.
   Sen jälkeen oletuspeili pois, uusi käännös, simulaattorisavuke ja merge-pyyntö Natiivisepälle (haara, commit,
   mitä muuttui, testit). Näin omistaja näkee linssin TF-kehittäjätilassa.
2. **Syväterävyys:**
   - Gaussin DoF omalla Volumella kameran kerrokseen (Filmipino.cs:n malli), `requiresDepthTexture` vain omassa kamerassa.
   - Tarkennus = `Asento.Etaisyys`, voimakkuus = `Asento.Aukko`.
   - Mitataan laitteella.
3. **Hionta:**
   - Taulu Pulun viereen marginaalilla (nyt peittää Pulun oikean reunan).
   - Pystynäytön keittiösommittelu (`kameraPysty`).
   - Salin lattian väri (oranssi lankku hallitsee).
4. **Codexin toimitus** (kun Päätoimittaja on lähettänyt tilauksen osa 1):
   - Pinnat: `PINNAT[id].tekstuuri`, jolloin maalattu varjostin näyttää tekstuurin UV:llä (rakennuskone tekee jo
     maailmatason UV:t / toisto_m).
   - Kokin atlas: 256×384-ruudut, henkilöpankin rivit.
   - Osa 2 tilataan erän 1 kuvilla.
5. **Äänet ja repliikit:** Pelikoodarin äänet ja repliikit sekä linssin äänisilmukkarajapinta (suunnitelma 8.2).
   Sisältökirjurin faktantarkistus (8.3).
