# Natiivi-UI: luovutus 29.10.2026 klo 10.11

Edellinen: viesti-natiivi-ui-luovutus-20261029-0030.md.

## Valmiit
- Nostonimet-214 616d4b6e0 on junan 214 rungossa e97d96f3b (NS, testit vihreät). Worktree proto-natiivi-ui-nostonimet on poistettu.
- Omistajan päätös 06.12: kartan nimien uudet koot kelpaavat. Piirrosnimet ovat samassa linjassa, eikä uusia toimia tarvita.

## KESKEN: juoksupelin rikottujen esineiden yhteenveto (omistaja 08.21–08.55, näkymä "Kelpaa" 09.59)
Haara natiivi-ui/rikotut-214, kärki 1020689b8:
- Peili: natiivi-backup peili/proto/natiivi-ui/rikotut-214.
- Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-rikotut.
- Sisältää PK:n haaran pelikoodari/rikotut-214 ecc57878d (data, SK:n historiat, omistajan nimet, B-muistokuvat ja lautaspöydän polku).

Näkymä (UI/Pelit/JuoksuRikotut.cs):
- Jos juoksussa rikottiin jotain, yhteenveto aukeaa itsestään ennen loppukorttia (PT 08.4x). Jos mitään ei rikottu, yhteenvetoa ei näytetä.
- Pohja on GALLERIA lasipinnalla (mk-galleria--lasi + tk-teema-lasi).
- Ruudukossa on vain rikotut esineet (omistaja 08.23). Kuvan alla on "Nimi (n kpl)", ja ennen sanaa kpl on sitova välilyönti.
- Kuvat ovat Codexin taustattomia esinekuvia (posti 459f75c54 A/ → Scripts/Juoksupeli/Resources/JuoksuV4/rikotut/<id>.png, sovitus Contain).
- Kultainen Jatka avaa loppukortin. Kokoelma-nappi ja vanha kokoelmakortti ovat ennallaan.
- Napautus avaa NOSTOKORTTI-pohjan kuvanoston (mk-nosto--kuvanosto, ModaaliTaso).
  - Kuvana on muistokupla pysäytettynä (JuoksuMuistokupla.Pysaytetty, sama soikiomaski).
  - Lisäksi nimi, KuplanAjoitus ja JuoksuEsine.HistoriaTaiTeksti.
- UI-tekstit ovat ui.fi.jsonissa: ui.juoksupeli.rikotut.otsikko ja .nimi-kpl.
- Testikomento: `ui juoksuloppu maali|rikotut [n]|jatka`.

Todennus:
- Ajo tehtiin batch-esikatselulla iPadin koossa, juoksupeli taustalla.
- Kuvat: proto-3d/_tyo/natiivi-ui/rikotut/ipad2-R1…R4.png (esikatselu-20261029-094536).
- Ajo: `zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/rikotut/ajo.zsh <sha> ipad /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/rikotut/sk-rikotut-juoksu.txt`.
- tarkista.sh: 0.

Seuraavaksi (omistaja 09.59, PT ja KK):
1. PK tilaa Codexilta viisi uutta muistokuvaa, koska nykyiset esittävät väärää esinettä: posliinimaljakko, lakkarasia, jadeastia, kello ja kääretaulu.
2. KK ja omistaja hyväksyvät kuvat, ja ne tulevat PK:n haaraan. Merge pelikoodari/rikotut-214 → natiivi-ui/rikotut-214.
3. Uusi R2 posliinimaljakosta samalla skenaariolla KK:lle (jos iPad-ajot ovat taas sallittuja; viikkoraja 97 %).
4. Kun KK on tarkistanut kuvat, merge-pyyntö NS:lle junaan 214. Worktree poistetaan, kun haara on rungossa.

## Opit
- zsh: `"$R:A..."` laajenee A-modifierina. Kirjoita git show -polut muodossa `"${R}:Assets/..."`.
- Batch-esikatselussa intro peittää ruudun noin 75 s ajan uuden pelin alusta. Odota 75 ennen UI-kuvia.
- Juoksupeli taustalle: `ui juoksupeli botti 1`, `avaus 0`, `v4 7`, `oleta 240 palatsi v2: peittokartta -- palatsi ladattu` ja `odota-maailma 180 100`, sitten QA-komennot.
