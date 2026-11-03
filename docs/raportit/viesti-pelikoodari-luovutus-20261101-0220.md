# Pelikoodari: luovutus 1.11.2026 klo 02.20 (konteksti 27 %, pehmeä raja)

Edellinen: -20261101-0205 (sen Kesken 3–4 yhä voimassa). Muistin tila: pelikoodari-tila-20261018-aamu.md.
Proto-worktree wt/proto-pelikoodari-reitti-216 (haara pelikoodari/reitti-216, kärki 1d6f7463d, ei pushattu: protolla ei originia).
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/reitti-216/ (c5f/c5f-havainnot.txt = tämän vuoron yksityiskohdat).

## Valmista tässä vuorossa (PT:n erä: ovet + c5e-kohdat; PT kuittasi kaiken 02.1x)
- OVET: lehdet eivät olleet t-portti-m15:ssä (pelkkä jalusta) vaan h-zhongyoumen- ja h-zhongzuomen-halleissa. LAV teki
  rakennukset-v90 (ovi_V/ovi_O lod0:n juurisolmuina kiinni-asennossa, jako x = 0, lehdet eri levyiset 1,85/4,26 ja 3,94/2,17 m).
  JU vei v90:n ämpäriin 02.18 (546/546). Peli 1d6f7463d: RakennusKansio v90 + Peli-testien MK_RAKENNUKSET-oletus v90;
  olemassa oleva PorttiOvet-logiikka avaa lehdet (vapaa reuna x ≈ 0 → venytys 1). Peli-testit OikeanPalatsin 4/4 (d6/juuri:ssa
  linkki kielletty-rakennukset-v90).
- (1) kallistus: puolitin ensin (b972df372), omistaja perui 02.04 → palautettu ennalleen 995d91a90. ÄLÄ muuta kallistusta.
- (4) maalikamera b972df372: pääportilla katse Puyin kohdalta 5 m:iin (JuoksuMaaliKuva.PaaporttiKatseY), ei nousua 38 m:n
  portin yli → Puyi ja portti kuvaan. Peli-testit 785/785, unity-tarkistus 0 virhettä.
- (2) EI PK:n työ (PT 02.1x): kuvissa Meridiaaniportin keskikäytävän oma geometria (suorakaideaukot + holvi, alapinnat kirkkaina)
  → arvioidaan valossa LAV:n leivonta v4:n jälkeen.
- (3) tausta portin takana puuttuu paketeista → LAV:n avoin työ (LAV lisäys 179, 917b3e534: edusta + Duanmen).

## Kesken / seuraava
0. AJA c5g (KUVA-AJO, EI VIELÄ AJETTU): zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/reitti-216/c5g/aja-c5g.zsh
   (taustalla, ~17 min; c5e-skenaario, peli 1d6f7463d). 02.19 levy notkahti 80 → 25 Gi (swap NS:n iPad-ajon aikana), joten
   skripti kieltäytyi (raja 70 Gi). Tarkista ensin df -g / ja ettei NS:n/LT:n ajo ole käynnissä (lokit/ uusimmat kansiot).
   c5f-ajo pysäytettiin (vanha koodi), sen kansio jää käyttämättä.
1. c5g:stä: ovikohta (c5b-vastine b-60…68: ovilehdet kiinni → aukeavat keisarin käsien osuessa, auki-lehti ei työnny seinästä;
   lokissa "pariovet ovi_O ovi_V" h-zhongyoumen/-zhongzuomen) ja maalikamera b-118…119 (Puyi + portti). Kuvat/arkki → PT
   (≤ 3 riviä). Jos lehti työntyy seinästä: LAV:lle suoraan.
2. Sitten LOPULLINEN VIDEO PT:lle → KK (KK tarkistaa myös sivueunukin ennakoitavuuden ≥ 2,5 s).
3. Sen jälkeen merge-pyyntö NS:lle (pelikoodari/reitti-216, kärki 1d6f7463d tai uudempi).
4. Edellisen luovutuksen Kesken 3 (botin uupuminen, kuva-ajoissa elinvoima-apu) ja 4 (s-osa/MK_TAUSTA, ≤ 4,5 m, valo-k1-216) ennallaan.
