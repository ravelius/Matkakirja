# Pelikoodari: luovutus 10.11.2026 klo 09.58

Korvaa kaikki aiemmat. Edellinen: `git show c25034c68:docs/raportit/viesti-pelikoodari-luovutus-20261110-0855.md` (hoidettu).
Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup), NYT haaralla pelikoodari/liiku-napautus-224.
Kuvat ≤ 1000 px. Viestit send_messagella session-id:llä. Python ilman -I:tä (paitsi tyolista.py).
TYÖLISTA ON JONO: T=/Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py; `python3 -I $T seuraava PK` | `tehty "OTSIKKO" "…"` | `este "OTSIKKO" "syy"`.

## TEHTY TÄLLÄ VUOROLLA
- TAUSTA v130 + leivottu paketti-v4: natiivi-backup pelikoodari/tausta-v130-224 = 66b550331 junan 224 kärjen 68d365e65 päällä
  (b2423f104 TaustaKansio kielletty-tausta-v130; 66b550331 Palvelin leivottu-v4, leivontalista v129→v130 69 url:ia, Rakennus.Lahde
  paketti-v2→v4 (oli jäänyt v2:een), työkalujen oletus paketti-v4). unity 0, peli 893/893. Paketti-v4 = v3 + v130: 530 glb + 524 kuvaa
  + taivas (v3:sta), 1152 Mt, SHA256SUMS cc9e23f28d8d. JU VEI leivottu-v4 (1057 obj, CDN 12/12). vienti-leivottu-v4.zsh:n objektilaskenta
  korjattu s3 ls | wc -l:ksi (JU).
- Liiku: PT 09.5x KUITTASI (peli kunnossa, QA-raja ei pelivika). Työlistalla tehty. Haara pelikoodari/liiku-napautus-224 (28bcfd438,
  0beb2c539, 622a81b4d, 369bcfa8c = vain QA-koodia) EI junaan (PT). Tulos _tyo/pelikoodari/liiku-224/TULOS.md.

## ODOTTAA
1. TAUSTA v130 iPad-ajo JU:lla (NB): 66b550331 laitekäännös → iso iPad sk _tyo/pelikoodari/juoksu-leivottu/sk-ipad-tausta-v130.txt
   → lokit/pelikoodari-tausta-v130. Kun valmis: katso kuvat (v130-lattia-a-maali, -b-laaja, kylmä/lämmin juoksu, paluu a/b/c) +
   muisti-tarkka.log: huippu ≤ ~3850 Mt, kylmä < 40 s, ei valkoisia, lattia yhtenäinen, ei punaista piikkiä → pari PT:lle (vertailu
   yhd-1: lokit/pelikoodari-yhd-1) → `tehty "Juoksupeli: uusi yhtenäinen lattia"` (jos rivi PK:lla) → junaan 224 PT:n kuittauksella.
2. Montparnasse (jonossa [1]): torni EI piirry napin päälle (UI on jo päällä, rajaus l2-peru täysikoossa) vaan tumma torni alakeskellä
   heikentää läpinäkyvän Liikun luettavuutta, myös aloitusnäkymässä l0. PT:ltä kysytty 10.0x: suositus aloitusnäkymän rajauksen siirto
   (NS/KS kameratyö), ei nappityylin muutosta (omistajan valinta).
   PT 10.0x PÄÄTÖS: TEE ITSE (aloituslento on PK:n, työlistan rivi "Pariisin aloituslento"): aloitusnäkymän LOPPURAJAUS niin, ettei
   Montparnasse jää alakeskelle Liiku-napin taakse; muu kuva (Eiffel, Louvre, Notre-Dame, Seine) ennallaan, lento ja kierto ennallaan,
   nappityyli ennallaan. Mac-pari l0 nyky (lokit/pk-liiku-napautus-korjaus3-ipad-369bcfa8c/l0-pariisi.png) | uusi → PT:lle → KK hyväksyy
   (ei omistajan korttia, ellei KK pyydä). Mac-ajo JU:n vuorolla, koko ipad (nappi 690,980 → Liiku alakeskellä).
3. Juoksupelin lataus nopeammaksi: odottaa (omistajan iPhone), sk _tyo/pelikoodari/juoksu-leivottu/sk-iphone-lataus-224.txt.
4. Peukalorenkaat [60]: odottaa yhteisajoa/oikeaa laitetta, ei koodattavaa.

Testit työpuussa: `cd Linssit-testit && sh unity-tarkistus.sh`, `cd Peli-testit && sh kaanna.sh` (sh, ei zsh).
