# Natiivi-UI: luovutus 9.10.2026 (kontekstin nollaus, PT:n käsky)

Työtila: proto-worktree /Users/Shared/Claude/wt/proto-natiivi-ui-olavpeli, web-checkout /Users/Shared/Claude/Matkakirja-natiivi-ui
(haara natiivi-ui-luovutus-20261005, vain raportit). Muistio: muisti natiivi-ui-tila-20261009.md.

## Kesken olevat erät

- **Juna 172** (omistaja 9.10.: kaikki yhteen junaan, Natiiviseppä kokoaa): NUI-kärki **6ed450fd4** on kuitattu ja Natiivisepällä.
  Mikseri valmis: Aanimikseri (Ydin), MikseriPalvelin (worker /mikseri/tasot, #4270 julki), Aanentasot, vain kehittäjäkoodilla.
- **Mikserin rekisteröinnit:** kuitattu LS2 807b14e4e, LS1 bd217b509, Siirtoseppä 9950cb17e ja Pelikoodari 2cb133c61.
  Pelikoodari lähetti tiedoksi cf5a16cb8 (kartan äänimaisemat maisema/<levynimi> ja lentomoottori tehoste/lento), katselmoimatta.

## Odottavat kuittaukset

- **LS2 8c516911f (mikseri-173: astro-humina ja iss-kaasu-suhina): EI KUITATTU.** Palautettu LS2:lle, koska maisemaryhmän
  kerroin tulee kahdesti:
  - LinssiTausta antaa Voima × Kerroin("maisema", id), ja AaniTila.MaisemaTaso kertoo vielä TaustanKerroin:lla.
    Korjaus: AaniKerroin("iss", id).
  - Silmukkapooli (Aanisoitin.PaivitaPooli) kertoo suhinan maisemaryhmällä tehosteet-kertoimen lisäksi.
  - Odotetaan LS2:n uutta SHA:ta, sitten katselmointi ja kuittaus.
- **Pelikoodari cf5a16cb8:** katselmoi samalla tavalla (kertoutuuko maisemaryhmä kahdesti: Aanisoitin.AsetaTaso × TaustanKerroin?).

## Jonon seuraavat

- **Pulun esigenerointi:** raportti f0574c5d8 (docs/raportit/pulu-esigenerointi-nykytila-20261009.md). PT: uusi linja Raamattuun
  (#4280, PULU ESIGENEROITUNA). **Ei generointia ennen omistajan lupaa määrästä ja syvyydestä.** Luvan jälkeen tehtävät:
  - generointityökalu
  - ämpäripaketti pulu/vastaukset/v1/<iso3>.json
  - sirurivi vieritettäväksi
- Sisältökirjurin 10 varustekuvaa: kytke vasta Sisältökirjurin tai PT:n käskystä.
- Kuninkaanlinnan lisäkuvat tulevat Sisältökirjurilta LS1:n kautta. Ei toimia ennen pyyntöä.

## Omat ajot

Ei käynnissä olevia ajoja, käännöksiä eikä simulaattoreita. Proto-worktree on puhdas viimeisen commitin jälkeen.
