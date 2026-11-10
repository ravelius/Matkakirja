# Natiivi-UI: luovutus 10.11.2026 klo 02.50 (kontekstivahti 25 %; korvaa -20261110-0155:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd. Natiivirepo = /Users/Shared/Claude/proto-3d/Matkakirja-proto
(remote natiivi-backup). Tarkistus `sh Linssit-testit/unity-tarkistus.sh`, testit `sh Linssit-testit/kaanna.sh` (worktreessä). Skenaariot
/Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/, lokit /Users/Shared/Claude/proto-3d/lokit/. Mac-esikatselu vain JU:n vuorolla (pyyntö JU:lle).

## 1. ODOTTAA KK:TA: nostopalkin asettelu fcac5c135 (PT: junaan vasta KK:n Kelpaa-sanalla; ei muutoksia ennen sitä)
- Haara natiivi-ui/nostopalkki-asettelu = juna-224 b6ffa01a4 + 4 (3a5e070a1, 710442788, c9dc82eb2, fcac5c135), worktree /Users/Shared/Claude/wt/proto-nui-nostopalkki.
- Syy: kortin ollessa auki (hakunappi piilossa) kaksirivinen palkki käytti SovitaOtsikkoa (mittaa nykyisestä asettelusta) → kameran lentäessä avattu jäi kapeaksi.
- KK:n palautus 3a5e070a1:stä korjattu: KaksiRivia oma rivi → 85 % → 2 riviä (rivin sisäleveys), sama sääntö hakunapin kanssa ja ilman (YhdellaRivilla);
  otsikko+✕ 6 pt alas koodissa (Pinnaus.Siirto; USS:n `translate: 0 12px` EI tullut voimaan c9dc82eb2:ssa → pois). Välit 22/21 ja 15/16 pt, palkki 78.
- `ui pinnaus` kertoo nyt otsikon koon ja rivityksen. Pari ja raportti: lokit/nui-nostopalkki-2-iphone-fcac5c135/ (PT:lle 02.2x).
- Sivuhavainto: Pulu.uss:81/89 käyttää samaa `translate: 0 8px` -muotoa → tarkista, toimiiko (ei vielä tehty, oma pieni erä).
- Konsolin ArgumentOutOfRangeException (loki.txt "ui konsoli pois" jälkeen) = editorin QuickSearch-indeksointi, vanha (29.10.–), PT:lle kerrottu.

## 2. ODOTTAA KK:TA: hetkien + skandaalien/syvennysten Pulu-kysymykset (haara natiivi-ui/hetki-pulu, worktree /Users/Shared/Claude/wt/proto-nui-hetki)
- 2b7f2e7b7 hetket (KS:n data PR 6531 df521f94f, skeema 1.70); a970b0d1c skandaali+syvennys samaan muotoon (NostoSisalto.Kysymykset(d),
  Kohta skandaali:<id>, syvennys:<kaupunki>-<täky>), testit 2285/2285. Pari lokit/nui-skandaali-pulu-1-iphone-a970b0d1c/ (PT:lle 02.3x).
- Datassa EI kysymyksiä skandaaleille/syvennyksille (PT:n oletus oli väärä; PT:lle kerrottu).

## 3. SEURAAVA ERÄ (PT 02.4x) — ALOITTAMATTA: Pulun valmiit v4 → v5
- PK:n paketti /Users/Shared/Claude/proto-3d/_valmiit/pulu-v5-hetket-20261110 (pulu/, SHA256SUMS, LAHTEET.md; sis. hetki:<id> FRA/GBR), EI ämpärissä.
- Tee natiivi-ui/hetki-pulu-haaraan (a970b0d1c:n päälle): PuluValmiitLataus.cs:23 `Juuri = Kuvat.PeiliJuuri + "pulu/vastaukset/v4/"` → versio
  yhteen vakioon (helppo nostaa v6:een skandaaleille). Levyvälimuisti on <ISO3>-<versio>.json (maat.json:n versio), tarkista ettei v4-välimuisti peitä v5:tä.
- Testaa Macilla PAIKALLISESTA paketista (ei ämpäriä): keino paikalliseen juureen (esim. kehittäjän ohitus / esikatselun kansio) → JU:n ajo,
  hetken kortti (hetki:eiffel-torni-1888): Pulu tarjoaa ja vastaa hetken valmiilla. Kuva iPhone-koossa PT:lle. Ei junaan ennen KK:n luentaa.

## 4. Muuta
- Hetki-Pulu odotti KS:n dataa: data tuli (PR 6531), PT:n linja kohdassa 2.
- Jono kohdan 3 jälkeen tyhjä → rivi PT:lle "JONO TYHJÄ: NUI".
