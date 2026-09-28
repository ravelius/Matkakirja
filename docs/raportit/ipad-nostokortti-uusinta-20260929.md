# iPad nostokortti-stressin UUSINTA 485376ca — Laitetestaaja, 29.9.2026 klo 01.2x

Käännös 485376ca (juna/b13 19517f56 = BUILD 40 + Natiivi-UI:n kosketus-välimuisti 36e6447f),
laite 3B4CDACB. Sama menetelmä kuin edellisessä raportissa (docs/raportit/ipad-nostokortti-
stressitesti-20260929.md), sama Delfoi-kortti, samat kiinteät pikselit (kuva 516,310;
kaiutin 322,98; valikko 766,72), oikea `mk-nosto__`-tunniste.

## Tulos: FIX EI TOIMI — kaiutin sulkee kortin edelleen iPadilla

1. **`ui kosketusvalimuisti`: käytössä**, "kosketusvälimuisti: käytössä
   (UnityEngine.UIElements.BaseVisualElementPanel), mitätöintikierroksia 3" — ominaisuus on
   aktiivinen kuten pyydettiin.
2. **Kuva ×20: PASS — 0/20 sulkeutumista.** Täysi sarja ajettu samaan pikseliin, kortti pysyi
   auki koko ajan.
3. **Kaiutin: EI PASS — sulkeutuu edelleen.** Kolme peräkkäistä tuoretta avausta + kaiutin-
   napautusta: 1. onnistui (kortti oli jo "lämmin" kuva-vaiheen jatkeena, ei tuore avaus),
   2. ja 3. sulkivat kortin **heti ensimmäisestä napautuksesta tuoreelta avaukselta** — sama
   käytös kuin ennen 36e6447f-korjausta. Vahvistin visuaalisesti kuvakaappauksella (kortti
   todella poissa, kartta+matkakirjateksti näkyvissä). **En jatkanut täyteen 20:een, koska
   toistuvuus oli jo yksiselitteinen ja löydös on identtinen edelliseen raporttiin verrattuna.**
4. **Mini-hampurilainen: PASS** (1 testattu tuoreelta laajennukselta, kortti pysyi auki) —
   sama kuin edellisessä raportissa, ei muuttunut.

## Johtopäätös
Natiivi-UI:n `natiivi-ui/kosketus-valimuisti` (36e6447f, kosketustapahtumien välimuistitus) **ei
korjannut** iPad-spesifistä kaiutin-sulkeutumisbugia. Ominaisuus on aktiivinen (mitätöintikierroksia
3), mutta itse sulkeutuminen toistuu identtisesti. Juurisyy on siis muualla kuin kosketustapahtuman
välimuistituksessa — todennäköisesti nostokortin oman kaiutin-käsittelijän ja iPadin leveämmän
kortti-layoutin (kaiutin x≈312-332 collapsed-tilassa, x≈789 laajennetussa) yhteisvaikutuksessa,
tai jossain muussa 1.0.40-junan komponentissa. **Suositus: älä julkaise iPadille**, Natiiviseppä/
Natiivi-UI tarvitsee uuden lähestymistavan.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
