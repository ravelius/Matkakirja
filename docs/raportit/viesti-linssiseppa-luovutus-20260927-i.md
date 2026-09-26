# Linssisepän luovutus 27.9.2026 yö (i) — Linssiseppä (Opus, max) = myös Mallinseppä

*Sessio 7ea9f18e (session id local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4), 26.9. klo 23.1x alkaen. Edellinen: -h.md.
Fable local_5df52e10-10e4-4b72-9554-0049db300dfe, Natiiviseppä local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
Natiivi-UI local_44392b3c-86ee-4873-9d76-82f9aaa6b832, Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab.*

## Jono (omistaja 22.3x, Fable) ja tila 27.9. klo 00.3x

1. **Kolme erikoismallia**: laitteella ajettu 00.08 (käännös 292e7a51), korjaukset tehty, UUSI KÄÄNNÖS klo 01.00
   (taustalla ajastettuna, kaanna.sh mallit2) → ajo `APPNIMI=mallit2 ajo-mallit.sh` (L = …/mallinseppa-laite-20260927-b)
   → kuvat + videot Fablelle → PYSÄHDY omistajan tarkastukseen.
2. **Merikokeilu** (laiva + valas): laitteella toimii, koko kaksinkertaistettu, sama käännös klo 01.
3. **Lento v3**: speksi HYVÄKSYTTY (omistaja 23.5x, 1.0.28). Koneen malli + kamera tehty haarassa mallinseppa/tiger-moth
   (alla). Natiivisepälle (käytävä, kytkin, Nappulan v3) ilmoitetaan erikoismallien toimituksen jälkeen.

## Erikoismallit: proto-haara `mallinseppa/pohja` (327689c3, worktree /Users/Shared/Claude/wt/proto-mallinseppa)

- Rebasetu Natiivisepän yhdistelmähaaran `natiiviseppa/kategoriat-reliefi` 6d0dfc49 päälle (juna d211337c + ylhaalta-175:n
  ääriviiva, valo ja maavarjo + reliefit + rajapinta). Osajako päällä (EmOsaAlku/Loppu → Alku/Loppu), KokoKerroin 1,5,
  Kolmiot0 todelliset (1 324 / 858 / 1 420), natiivi-ui/nostokortti-avattu 1a46986d mergetty (kortin JOKAINEN avaus →
  tapahtuma, Nostokortti.Avattu).
- Laitteen löydökset 00.1x ja korjaukset 327689c3: maatason osat (MSM hiekka/vesi/vaahto, Stonehengen valli/lampaat/säde)
  0,006 ylemmäs, koska liioiteltu maasto peitti ne; Stonehengen nurmilevy pois ja valli vaaleaksi seepiaksi speksin
  mukaan (ruoho = kartta); MSM:n silta 0,024. Todellinen yö sytyttää valot → arviointikuvissa `erikois yo 0`.
- **COLOSSEUM EI NÄY PÄÄKARTALLA** (karttavalo paakartalla false, kohdekartta rooma): kysytty Fablelta 00.1x
  (A = Rooman kaupunkipisteen maamerkkinä, suositus; B = vaihda pääkartan kohteeseen; C = odottaa kaupunkinäkymää).
  Omistajalle Colosseumista esikatselukuvat (proto-3d/lokit/mallinseppa-esikatselu/kuvat/colosseum-*).
- Ensimmäisen ajon kuvat: /Users/Shared/Claude/proto-3d/lokit/mallinseppa-laite-20260927/ (MSM ja Stonehenge ok,
  Stonehengen nurmi osin maaston alla, Colosseum puuttuu).

## Merikokeilu: `linssiseppa/merikoristeet` (e89349c4, worktree /Users/Shared/Claude/wt/proto-linssiseppa)

- Höyrylaiva b59c99b0 on junassa d211337c. Merikoristeet sen päällä: Aiheet `merilaiva` ja `valas` (NOR 4,113 E 61,013 N),
  näytös/tauko (tauolla 0 kehystä), koko nyt noin 22 pt / 28 pt (lajilistan 11/14 pt olivat laitteella pilkkuja),
  siirrot 120 / −80 pt. Komennot `elava elementit nayta <aihe> [harvinainen]`, `koko <k>`.

## Lento v3: `mallinseppa/tiger-moth` (4b62bd8c, worktree /Users/Shared/Claude/wt/proto-mallinseppa-lento, pohja mallinseppa/pohja)

- `Kartta/Erikoismallit/TigerMoth.cs`: DH.82A seepiana (runko 1 086, potkuri 52, huivi 16 kolmiota; Fogg edessä).
- `Kartta/Erikoismallit/TigerMothKone.cs`: Luo(isä, materiaali) ja Aseta(t, siemen, reitin kallistus).
- `Kartta/LennonV3.cs` + Kartta-testit/Testit/LennonV3Testit.cs (11 testiä, kaikki Kartta-testit 322/322): kamera-
  kanavat, nopeusprofiili, korkeus/lasku, Ateenan kuvauslinja, kallistus, Elo.
- Esikatselu: scratchpad /Users/Shared/Claude/proto-3d/tyokalut/tigermoth-esikatselu/ (kaanna.sh tigermoth + python3 kone.py).

## Työkalut

- Ajot: /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/ (ajo-mallit.sh, kaanna-jono.sh, rajaa.py).
- Merikoristeiden esikatselu: /Users/Shared/Claude/proto-3d/tyokalut/meri-esikatselu/.
- Käännöskuri: yksi käännös kerrallaan, ikkuna :00–:15, rivi Karttasepälle ennen ja jälkeen (Natiivisepän lupa 23.5x
  ajaa proto-kaanna.sh itse D0D2CD1E:hen).
