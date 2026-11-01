# Pelikoodari: luovutus 1.11.2026 klo 02.05 (konteksti 25 %, pehmeä raja)

Edellinen: -20261101-0016 (sen Kesken 3–4 yhä voimassa). Muistin tila: pelikoodari-tila-20261018-aamu.md.
Proto-worktree wt/proto-pelikoodari-reitti-216 (haara pelikoodari/reitti-216, kärki 0ba9896af, ei pushattu: protolla ei originia).
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/reitti-216/ (c5b, c5c, c5d, c5e: sk-*.txt, aja-*.zsh, arkit, havainnot).

## Valmista tässä vuorossa (reitti-216, Peli-testit 785/785)
- 4d5100451 (edellinen vuoro): RakennusKansio v89 (LAV: siltojen kannet V4_lattia + sivusiltojen reitit). JU vei v89:n ämpäriin 00.29
  (546/546). Leivottu esto ennallaan (v89:n törmäysmallit = v88, LAV:n LAHTEET.md).
- c5b (lokit/esikatselu-20261101-005431): b-kuvat loppuivat ennen siltaa. c5c (-010349, b-00…b-119): juoksu päättyi
  UUPUMISEEN 807 m / 121 s (loki "uupui z807", loppukortti Uupui) – kuvissa Puyi "juoksee paikallaan", koska UI ei näy kuvissa.
  EI jumia eikä törmäystä (PT:lle korjattu 01.5x).
- 0ba9896af: Peli-testit – OikeanPalatsinBottiKeisarinSillalla myös kaikista tulosuunnista (1240/1240 maaliin) ja uusi
  OikeanPalatsinBottiEiJaaPaikalleen (koko juoksu keskeltä Meridiaaniportille 10 siemenellä: ei jumia, 9 maali, 1 uupui).
  Aja: MK_JUURI=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/reitti-216/d6/juuri ./kaanna.sh OikeanPalatsin
- c5e (-015229): sama kuin c5c + `ui juoksupeli elinvoima 100` joka 10. b-kuvan jälkeen (kuva-ajon apu). Botti keisarin
  sillalla b-106…111 (kansi laatoitettu, ei uppoamista), maali b-117. Lähetetty PT:lle 02.0x (c5e/arkki-b100-b119.jpg,
  c5e/c5e-havainnot.txt).
- c5d (pelin tila -komennoilla) jäi tarpeettomaksi; huom: esikatselussa ei ole komentoa "tila" (VIKA), passiivinen on `paikka`.

## Kesken / seuraava
1. PT:n kuittaus c5e:lle → c5 KK:lle kokonaisena (PT päättää, käytetäänkö c5e:tä vai uutta ajoa ilman elinvoima-apua),
   sitten merge-pyyntö NS:lle (pelikoodari/reitti-216).
2. Vanha vika (ei v89): Puyi juoksee portin suljettujen ovien läpi (c5 b-06…07, c5b b-64…66, z ≈ −388) – mainittu PT:lle.
3. Botin uupuminen: pelissä elinvoima voi loppua ennen maalia (c5b-siemen 993805462 simussakin uupuu 666 m:ssä). Kuva-ajoihin
   elinvoima-apu; pelin tasapaino PT:n päätös, jos kysyy.
4. Edellisen luovutuksen Kesken 3 (s-osa ei toteudu, MK_TAUSTA-oletus) ja 4 (≤ 4,5 m -tavoite, valo-k1-216) ennallaan.
