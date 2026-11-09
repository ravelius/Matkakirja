# Natiivi-UI: luovutus 9.11.2026 klo 09.15 (kontekstivahti 28 %; korvaa -0812:n)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7.
Kaikki on koetta, EI JUNAAN ilman omistajan korttia. Mac-kuvat ensin PT:lle, sitten KK:lle.
Arkki: scratchpad-skripti (PIL, 2 tai 5 kuvaa/rivi 3600 px, otsikkokaista; Arial ei piirrä ▾:ta → "v"). Esimerkki
lokit/nui-nostovalikko-osa2-1-iphone-vaaka-d396cbcbf/arkki-osa2-1.jpg. Käännöstarkistus: `sh Peli-testit/unity-tarkistus.sh` worktreessä (~3 min).
Mac-ajot vain JU:n vuorolla (skenaariot proto-3d/_tyo/natiivi-ui/, esim. sk-nostovalikko-osa2-1.txt). Muokkaukset: python-skripti
(lista (vanha, uusi), yksi osuma, .tmp + os.replace + copymode). USS-sudenkuoppa: saman painoinen valitsin myöhemmin Kartta.uss:ssa voittaa
(vihje 092345d80 → korjattu 315a07d47 kahden luokan valitsimella).

## Valmiit tässä istunnossa (kaikki junassa 223, JU: juna 223 = 4e972eeed, testit vihreät)
- Nostovalikko osat 1–3 + osa 2 + c6d66b491 + 474011364 + vihje 315a07d47 + a7869ef66 (iPhonen palkki yhdelle riville aina kun mahtuu,
  Pinnaus.YhdellaRivilla; KK 08.33). OMISTAJAN PÄÄTÖS 08.37 "Kelpaa". Junahaara natiivi-ui/nostovalikko-juna223 (poistettava worktree
  /Users/Shared/Claude/wt/proto-natiivi-ui-nostovalikko-juna223 ja wt/proto-natiivi-ui-nostovalikko, kun ei enää tarvita).
- Kuvateksti 835f617a6 on junan pohjassa.

## KESKEN: PAIKKAPALKKI JA TOISEN KAUPUNGIN NOSTON LENTO (PT 09.0x, OMISTAJAN PÄÄTÖKSET 08.4x)
Suunnitelma (lue kokonaan): /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261109-paikkapalkki-ja-noston-lento.md
Haara natiivi-backup natiivi-ui/paikkapalkki, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-paikkapalkki, kärki fb4c270ef:
- 6854466d2 = osa 4 lentokartta (3925d008d) rebaseattuna 4e972eeed:n päälle (USS-ristiriita: molemmat lohkot pidetty).
- fb4c270ef OSA 1: pilleri kaikilla tasoilla (Karttaselite.KaupunkiNakyy ilman KaupunkiNakyma.Auki-ehtoa); nimi on jo valmiiksi
  kaupunki kaupunkinäkymässä, muuten maa (KaupunkiNakyma.Paivita). Pillerin valikko sulkeutuu, kun KaupunkiId vaihtuu. 0 virhettä,
  EI VIELÄ AJETTU. Tarkista Macilla: Ranskan taso "Ranska ▾" → valikko maan tasolla; zoom Pariisiin → "Pariisi". Kiinnitetty nosto
  maan tasolla → palkissa "‹ Ranska ▾ ›" (Pinnaus.Yhdistetty vaatii vain nimen). M ennallaan vain kaupunkinäkymässä (Matkakirjakortti
  käyttää KaupunkiNakyma.Auki). Linssit/museo/juoksupeli: pilleri piiloon 🔍:n mukana (ehto linssit.style.display).

OSA 2 (seuraavaksi): toisen kaupungin nosto kartalta samaa polkua kuin valikosta.
- Valikon polku: KaupunkiNostovalikko.Valinta(Rivi) (Lentokartta.Lento + NahtavyysEsittely.Napautus(id, lat, lon, kaikki: true),
  fallback k.Aja katseluetäisyydelle).
- Kartan polku: NostotKartalla.AvaaNosto(id, s) :709 → NahtavyysEsittely.Napautus(id, lat, lon) (vain kohdenostot ja "kohde:"),
  muuten AvaaNostoKortti (kortti, kamera paikallaan). Lisää: noston kaupunki = KaupunkiNakyma-tyylinen haku pisteelle (tee
  julkinen KaupunkiNakyma.KaupunkiPaikalle(lat, lon) LahinKaupunki-logiikalla, säde KaupunkiNostot.SadeKm); jos kaupunki != null ja
  != KaupunkiNakyma.KaupunkiId → sama polku kuin Valinta (tee Valinnasta julkinen apu, jota molemmat kutsuvat). Muuten ennallaan.
- Nimi palkkiin lennon ajaksi: lisää KaupunkiNakymaan ohitus (kohteen kaupunki-id ja nimi), joka voimassa lennon alusta, kunnes
  nosto suljetaan tai pelaaja liikuttaa karttaa; nimi = kaupunki, muuten paikkakunta noston tiedoista, muuten maa.
- Lentokartta (osa 4) näkyy myös näissä lennoissa ja paluussa (Lentokartta.Lento kutsutaan samasta apufunktiosta).

OSA 3: paluu sulkiessa. Lähtönäkymä talteen ensimmäisen toisen kaupungin lennon alussa (PalloKierto.NykyinenNakyma(), KameranNakyma;
paluulento AjaNakymaan(n, kesto) :486). Uusi nosto perillä ei vaihda lähtönäkymää (ei ketjua). Sulku = nostokortti kiinni tai kiinnitys
pois (Pinnaus.NaytaPalkki(false) / Nykyinen null; tarkista Nostokortin sulkutapahtuma). Pelaaja liikutti: PalloKierto.PelaajanEle
(:650, laukeaa vedossa :1433 ja Macin eleessä :1585, ei tapissa). Kynnysehdotus PT:lle/KK:lle: paluu estyy vain, jos eleen jälkeen
paikka siirtyi > 10 % näkymän leveydestä tai korkeus > 15 % tai pelaajan oma kierto > 15° (mittaa eleen alusta, ei esittelyn kierrosta).

L-2 ORANSSI TAUSTA (kerrottu PT:lle 09.1x, NS:n asia): lento Pariisi → Carcassonne 600 km 2,2 s:ssa lähes kaupungin korkeudella;
PalloAjo-nousu = kulma/90 ≈ 0,06 (PalloKierto.AjaKallistukseen, Linssit/Ydin/Kamera/PalloLiikkeet.cs), laatat eivät ehdi → pallon
pohjaväri. Odota PT:n jakoa; omalla puolella voi pidentää kaupunkien välisen lennon kestoa (NahtavyysEsittely.LentoS on yhteinen,
älä muuta sitä muilta).

Mac-kuvat suunnitelman kohdan 4 mukaan (iPad vaaka, iPhone pysty ja vaaka): Ranska → zoom Pariisi; Ranskan kartalta toisen kaupungin
nosto → lento → nimi + nosto auki; sulku → paluu (ennen/jälkeen samasta kohdasta); pelaaja liikuttaa → ei paluuta. Uusi skenaario
sk-paikkapalkki-1.txt (pohjaksi sk-nostovalikko-4.txt: lentokartan ajo ja `ui lentokartta`). → PT → KK → omistaja kortilla.
