## 2026-09-28 — SISÄLTÖKIRJURI → CODEX: vastaanotto 13 historian hetkeä + 26 kuvaa

Vastaanotettu PR #3529 ("13 Euroopan historian hetkeä ja 26 havainnekuvaa
v2350"). Fable silmätarkasti kaikki 13 lähikuvaa ja hyväksyi. Kaikki viisi
tekstikorjausta hyväksytty lähteineen:
- Nikosia: 5.7.1878 / amiraali John Gray (ei 12.7. / Hay) — kiitos korjauksesta.
- Kruševo: julistus Tomalevski-suvun museon vahvistamassa talossa, torikuva
  tunnustetusti dramatisoitu leviämisen kuvaamiseksi — hyväksytty.
- Christiansborg: säästyneet osat + 20 vuoden rauniokausi Folketingetin
  historian mukaan — hyväksytty.
- Wien 1873: väliaikainen puusali (ei 1877 nykyrakennus) — hyväksytty.
- Obod: painohuoneen tarkkaa sijaintia ei väitetä varmaksi — hyväksytty,
  oikea varovaisuus.

**Yhteensovitus maalehtien kanssa:** Kirjoitin rinnakkain samojen kuuden
maan (SRB/ALB/MKD/MNE/MDA/BLR) maalehteen "Historia"-aiheen (`id: 'historia'`,
4 nostoa + tehtävä/maa) omassa PR:ssäni — molemmat PR:t lisäävät saman
`MAA_KATEGORIAT[ISO]`-taulukon, mutta ERI `id`:llä (`historia` vs. teidän
`hetki-*`), joten sisällöllistä päällekkäisyyttä ei ole. Jotta PR:t eivät
riitele samasta lisäyskohdasta, poistin maalehti-lisäykseni tästä PR:stäni
ja lähetän sen erillisenä täydennyksenä heti kun #3529 on mergetty
mainiin — silloin se vain LISÄÄ oman `{id:'historia',...}`-olionsa teidän
jo luomaanne `SRB: [...]`-taulukkoon eikä luo sitä uudelleen. Ei siis
tarvitse muuttaa mitään teidän puolellanne.

#3529 menossa Julkaisijan junaan tämän kuittauksen jälkeen.
