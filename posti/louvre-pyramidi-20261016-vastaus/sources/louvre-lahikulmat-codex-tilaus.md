# Codex-tilaus: Louvren lähikuvat L1–L3 (tavoiteluupin jatko, Linnanrakentaja 16.10.2026)

Tila: omistajan lupa 16.10.2026 klo 12.17 ("Kyllä, 3 kuvaa (Suositus)", Päätoimittajan kautta). **Tasan 3 havainnekuvaa**, ei
vaihtoehtoja eikä lisäkuvia. Lähettäjä Linnanrakentaja. Sama yleisohje kuin K1–K7-tilauksessa (`louvre-codex-tilaus.md`):
havainnekuvat ovat sisäisiä tavoitteita 3D-mallille, eivät peliin.

## Tehtävä

Kolme fotorealistista havainnekuvaa Louvren palatsista lähietäisyydeltä, täsmälleen kulmista `louvre-lahikulmat.json`
(L1–L3), koko **1536 × 1024**, ja jokaisesta siluettimaski. Ilmakulmat K1–K7 on jo mallinnettu rajoihin (IoU 90,5–93,5 %);
nyt tavoite on **julkisivujen ja kiveyksen yksityiskohta**: mittasuhteet ja korkeudet ovat sitovia kuten ennen.

| Kulma | Kamera | Mitä näkyy ja mitä piirretään tarkasti |
|---|---|---|
| L1 Richelieun pihajulkisivu | Napoleonin pihalla 22 m korkealla, katse pohjoiseen (20°) | Richelieun siiven pihajulkisivu (Cour Napoléon) koko pituudelta: Pavillon Richelieu, pohjakerroksen kaarikäytävä, pilasterit, kerroslistat, ikkunakehykset, veistokset syvennyksissä, lucarnet, kattopatsaat, liuskemansardi, savupiiput; kiveys etualalla |
| L2 Cour Carrée | pihan itäpäässä 20 m korkealla, katse länteen (287°) | pihan länsijulkisivu ja Pavillon de l'Horloge (Sully) keskellä, karyatidit, päätykolmiot, pohjois- ja eteläsiipien pihajulkisivut sivuilla; pihan hiekkapinta, kivireunat ja keskusaltaan kivireunus |
| L3 pyramidin kiveys | pihan länsipäässä 9 m korkealla, katse itään (89°), kallistus alas | Napoleonin pihan graniittilaattakiveys: laattojen koko ja saumat, kulumat, sävyvaihtelu ja lätäkkäjäljet; Ludvig XIV:n ratsastajapatsas jalustoineen; Richelieu ja Denon reunoilla, Sully taustalla |

## Geometria on lukittu (kuten K1–K7)

- `louvre-L<n>-massa.jpg`: LiDAR HD -massa samasta kamerasta. **Piirrä tämän päälle**: siivet, paviljongit, katon reunat ja
  harjat samoihin kohtiin.
- `louvre-L<n>-maski.png`: palatsin rakennukset valkoisena, muu musta (maski ei sisällä patsasta eikä maata). Palauta oma
  maskisi samassa koossa; vastaanottotarkistus IoU ≥ 95 % massamaskia vastaan ennen yhtään mallikierrosta.
- `louvre-L<n>-oma-k36.jpg`: nykyinen oma 3D-malli (k36) samasta kamerasta, vain tiedoksi: älä kopioi sen muotoja, jos
  ne poikkeavat valokuvista; ne ovat juuri se, mitä korjataan.
- `louvre-L<n>-peli-google.jpg` ja `louvre-L<n>-peli-k36s.jpg`: pelikuvat samoista kulmista (Googlen 3D-laatat ja oma malli
  pelissä), vain valon, sävyn ja mittakaavan viitteeksi. Googlen kuvaa EI käytetä lähteenä muodolle eikä tekstuurille.
  **Pelikuvat tulevat tähän postiin perässä ~14.00** (Valosepän simulaattorivuoro); aloita massakuvista ja maskeista, älä odota niitä.

## Sisältö ja rajaukset (ennallaan K1–K7:stä)

- **EI lasipyramidia, ei altaita eikä pieniä pyramideja** (suojattu teos). L3:ssa niiden paikalla jatkuu tasainen kiveys.
- Kivi vaalea hunajanbeige kalkkikivi, säänkulutus ja likajuovat listojen alla; katot sinertävänharmaa liuske ja lyijy.
- Kiveys: suuret vaaleanharmaat graniittilaatat (orto + valokuvat), saumat näkyviin, luonnollinen kuluma.
- Ei tunnistettavia ihmisiä, mainoksia, tavaramerkkejä eikä nykytaidetta; kirkas kesäpäivä, aurinko etelästä 40–50°.
- Merkintä "havainnekuva" pieneen kulmaan.
- Lähteet: oma aineisto (LiDAR HD, IGN-orto 20 cm) ja Commons-referenssit `louvre-ref-*.jpg` (`louvre-LAHTEET.md`;
  Richelieun pihajulkisivu, Cour Carréen länsijulkisivu, Sullyn päätykolmio, Napoleonin piha). Ei Googlea, Earthia, Street Viewta.

## Palautus

`louvre-L1.png` … `louvre-L3.png` (1536 × 1024) + `louvre-L1-maski.png` … `louvre-L3-maski.png` kansioon
`posti/louvre-lahikuvat-L1-L3/` ja kuittaus `codex-linnanrakentaja-louvre-L1-L3-<pvm>.md` (mittausvirheet, joissa poikkesit maskista).
