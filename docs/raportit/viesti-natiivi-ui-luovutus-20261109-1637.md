# Natiivi-UI: luovutus 9.11.2026 klo 16.37 (kontekstivahti 27 %; korvaa -1616:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, PK local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7.
Kuvat ensin PT:lle (3 riviä). Lokit /Users/Shared/Claude/proto-3d/lokit/, skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/.
Esikatseluajot pyydetään JU:lta. Tarkistus worktreessä: `sh Linssit-testit/unity-tarkistus.sh` ja `python3 -I tyokalut/pohjavahti.py`.
Lue -1616 (git show 170c06bc0:docs/raportit/viesti-natiivi-ui-luovutus-20261109-1616.md), kohdat 3–5 (FPV-koe, palkin selaus aa46f41db, vahti) ennallaan.

## 1. HAARA natiivi-backup natiivi-ui/temple-orbit = 606e08631 (worktree /Users/Shared/Claude/wt/proto-natiivi-ui-temple)
Sisältää: a73c5c202 (valikko, OMISTAJA 16.13) + 606e08631:
- PALKIN ✕ (OMISTAJAN PÄÄTÖS 16.25, PT): pin-kuvakkeen paikalla ✕ (Pinnaus.Sulje: luenta seis, palkki ja alla auki ollut ikkuna kiinni;
  väistöllä ei ✕:ää). Nostokortti: avattu nosto kiinnittyy palkkiin automaattisesti (AvaaReitti else-haara → VaihdaPin).
- PALKKI EI JÄÄ EDELLISESTÄ PAIKASTA (KK: Lontoo + "Panthéon (1/4)", "Tuileriain rauniot ‹ Marseille ›"): Pinnaus.Kohde.Kaupunki
  (Nahtavyysarkki k.Kaupunki, Nostokortti NostonKaupunki); kamera levossa toisessa kaupungissa → Sulje. Kohde.Lahto estää sulun
  matkalennon alussa (nollautuu perillä).
- TEMPLE-DIAGNOOSI: `ui kohdenostot sijainti <nimi>` (merkin lat/lon, pinta, nosto, akselin ruutupisteet h0/nosto/+50/+100, kierron keskus).
- Testi: `ui pinnaus napauta-sulje`.
AJO JU:n JONOSSA (pyydetty 16.3x): Mac koko ipad, sk-temple-palkki-1.txt, lokit lokit/nui-temple-palkki-1-ipad-606e08631.
KATSO: v-1 valikko "Nähtävyydet (12), Kadonneet ihmeet (9)"; t-1…t-4 Temple-merkki samassa maan kohdassa (vertaa kuvia + sijaintirivit);
x-1 ✕ sulkee (puhe "-"); n-1 kiinnitys + ✕ näkyy palkin vasemmassa reunassa (tyyli .mk-pinpalkki__sulje margin-left -8px, tarkista);
n-2 suljettu; p-1 Panthéon palkkina; p-2 Lontoossa palkki pois (loki "palkin nosto kaupungista pariisi: suljetaan").
Sitten pieni iPad -kuvat PT:lle (Raamattu 2.217) → junaan 223.

## 2. TEMPLE-ORBIT (OMISTAJA 16.12) – SYY AUKI
Owner'n kuvat 1612-temple-orbit-kuva1/2: Temple-merkki (punainen piste + kyltti) JA sen kuvapallo pysyvät tarkalleen samoissa ruutupisteissä
ruudun keskiviivalla, kartta pyörii alla. Mac-ajo nui-orbit-napautus-1-ipad-0bf9cd57d (Concorde): merkit seuraavat karttaa oikein.
Päätelmä: merkit ovat kierron pystyakselilla (kierto = AjaKiertaen, LaskeAsento kiertää (pituus, leveys, katseKorkeus 0)), joten ne pysyvät
ruudulla; maa liukuu alla, jos merkin korkeus (MaanPinta.Nosto) ≠ näkyvän maan korkeus Templen kohdalla. SijaintiLOKI ratkaisee:
jos maa pysyy esim. "h0"-pisteen kohdalla, merkin korkeus väärä. Tarkista myös PiirrosKerros.Nakyvyys (nosto × (1 − n)) ja NakyvaLat.
Laitteella mahdollisesti Striimi + KorkeusKerroin.TasaKorkeusM (Mac voi poiketa).

## 3. 3D-TÄHTI KADONNEELLE (OMISTAJA 16.12 "pitäisi näkyä se kolmiulotteinen tähti") – EI ALOITETTU
PiirrosKerros.Tahdet piirtää 72 ruudun pyörivän tähden vain piirrokselle (alfa = piirroksen näkyvyys); kuvat latautuvat Pariisissa
riippumatta alfasta (PaivitaTahtiLataukset). Suunnitelma: PiirrosKerrokseen lukufunktio TahtiKuva(nimi) (tahtiRuudut[TahtiRuutu(i)].kuva),
NostotKartalla: kadonneen kohdenoston merkkiin (Tahdet-nimet, Kadonneet päällä, Nakyvyys ≤ 0,5) UI-tähti merkin pisteen yläpuolelle,
ruudun vaihto 12 fps (juuri.schedule Every 83 ms). Tähdet ovat KS:n (paketti pariisi-tahdet-20261102): kerro PT:lle/KS:lle lukufunktiosta.

## 4. PT:LLE LÄHETETYT KYSYMYKSET (16.3x), vastaus kesken
- Kartuscha ("RANSKA" Lontoossa): Kartuscha.TodellinenMaa seuraa pelaajan sijaintia (Pelaaja.Sijainti), ei kameraa; kuvassa pelaaja
  Pariisissa, Lontoo katsottiin kameralla. Vaihdetaanko seuraamaan katsottua kaupunkia (KaupunkiNakyma.KaupunkiId → maa)? Ei muutettu.
- Noston kortin oma pin-kuvake jäljellä (painallus irrottaa ja sulkee): poistetaanko, kun nostot aina kiinnitettyinä? Ei muutettu.

## 5. PK (8cdb4549c, natiivi-backup pelikoodari/vasen-tikku): liiketappi PalloKierto.Etene()ssä
Jos muutat Etene():tä: säilytä ajoLiikeKerroin/ajoLiikeSiirto-nollaus (johtaja == null -lohko) ja AjonLiikeSiirto()-kutsu heti
`korkeus = a.KorkeusM` -rivin jälkeen, tai kerro PK:lle. PK odottaa NUI:n liikerajapintaa (nimi + sha), jos sellainen tehdään.
