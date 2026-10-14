# Linssiseppä 2 – välitila 14.10.2026 klo 03.22 (Suomen aika)

Jatkaa luovutusta viesti-linssiseppa-2-luovutus-20261014-0145.md (OMISTAJAN RAKETTIPYYNNÖT siellä sanatarkasti).

## RAKETTI – lähetetty PT:lle 03.2x (savu9)
Worktree /Users/Shared/Claude/wt/proto-linssiseppa2-raketti, haara `linssiseppa2/raketti-savu-189` **3f4349007** (natiivi-backup pushattu),
käännös 93a003a0e. Sisältää PK:n `pelikoodari/raketti-laukaisu-189` e66747799 (kello kerran kehyksessä ennen kameraa) ja 8f0c1d21c
(ennakkokamera loppukuvaan); PK:n 88774281b yhdistetty ja peruttu (väärä diagnoosi, PK:n oma revert 0c2aa168f).
- PT:n 4 kohtaa: (1) avauksen musta: otsikko ui.raketti.iss + ui.raketti.lahto-alirivi (AstronautinNakyma, LaukaisunKamera != null);
  avauslennon harmaa neliö = alustan laatan sumu kaukaa → RakettiMaasto häivyttää laatan rasterina 9 → 6 km:n kameraetäisyydellä
  (_Nakyvyys), päivän järvet _Vesi-värillä. (2) esisavu: EsiMax 120, 0,6–1,1 m, alpha 0,22, ×5, painovoima 0,35, 22 / s.
  (3) maapallo lähestymisessä: PK:n puoli, EI vielä täysin korjattu (PK: avomeren lopussa yhä sinistä) – älä kirjaa korjatuksi.
  (4) kiertoradan tähtikuva: katse Maan reunan suuntaan korkeuden mukaan (RakettiLahikuvat.TahtiKallistusKorkeus, reuna 0,75° Pulun
  alla, Pulu RuutuY 0,6, OsuusKierto 0,025 → kuva-ala ~4°).
- Kameran hyppy kiertoradalla (savu7-diagnoosi: kamera 1,1 km akselia pitkin joka toisessa kehyksessä) = kehysviive, korjattu PK:n e66747799.
- Todisteet: lokit/todistus-savu9-ipad-20261014-0312 (kuva-arkki.png, raketti-savu9-ipad-aani.mp4 = kertoja + pelin äänet, vaaka),
  todistus-savu9-iphone-20261014-0316 (yö).

## KESKEN / seuraavaksi
1. PT:n palaute savu9:stä; kuittauksen jälkeen haara junaan 189 (NS:lle SHA).
2. RCS-suihkut ja telakointi ISS:ään: alus ei käy ISS:n luona (kamera sekoittuu todellisen ISS:n seurantaan, pino jatkaa omaa rataansa).
   Vaatii RakettiLaukaisu.cs:n (PK) – ehdotettu PT:lle erillisenä eränä.
3. Pikkuhavainnot: iPhonen yöavauksen 0,5 s:n kuvassa meri harmaan utuinen (pallon oma sumu kaukaa); savu8:n iPhone-ajosta puuttuivat
   kuvakaappaukset (kuorma 22), savu9:ssä kunnossa.
Ketjut: _tyo/linssiseppa2/raketti-savu/ketju-savu{4..9}.zsh + sk-savu{4..9}-*.txt (savu9: kertoja päällä, aani-alku 112).

## PÄIVITYS 05.0x – yhteinen paketti PT:n kuittaukseen (savu14)
Haara `linssiseppa2/raketti-savu-189` **2325092dc** (käännös 0fecdf73e) = PK `pelikoodari/raketti-laukaisu-189` 674cdbf2f + 46035083b +
8693f92fe (maapallo, liioittelu 1 laukaisun ajan, valintakamera lähikuvaan) + NUI `natiivi-ui/raketti-lcd-189` 0cad3a15a + omat:
77b7f9d94 (Pohjois-Norjassa, havaintopisteet piiloon), 324e06bb2 (RCS), 43e6d7208 (ei avaruussumua lennossa), e8fb55e1a (avaus 9 km:stä,
laatta näkyy 12 → 10 km), 2325092dc (laatan sumu 6 km:stä). Reunahäivytys kokeiltu ja poistettu (adf82e72d).
Todisteet: lokit/todistus-savu14-ipad-20261014-0453 (kuva-arkki, raketti-savu14-ipad-aani.mp4), todistus-savu14-iphone-20261014-0457.
Avoin kysymys PT:lle: ISS:n karttamerkki näkyy lennon aikana maaston päällä – piiloon vai tarkoituksellinen?
Seuraavaksi: PT:n kuittaus → NS:lle SHA junaan 189; telakointi ISS:ään erillisenä eränä PK:n kanssa (PT hyväksyi).
