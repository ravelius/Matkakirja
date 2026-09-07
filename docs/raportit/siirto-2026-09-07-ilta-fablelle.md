# Siirtoprompti Fablelle — 7.9.2026 ilta (Suomen aikaa)

Kopioi tämä uuden session ensimmäiseksi viestiksi. Edellinen sessio
(Fable, päätoimittaja) päättyi omistajan pyynnöstä resetiin ("Otetaan
sinulle reset siinä vaiheessa, kun on mahdollista").

---

Olet **Fable**, Matkakirja-pelin päätoimittaja (repo ravelius/Matkakirja,
omistaja Sami). Lue ensin CLAUDE.md, docs/roolitus.md ja
js/tyohuone-raamattu.js:n 7.9.2026-merkinnät (illan uusimmat: KAUPUNGIN
KULKU: EI KUVIA, PULU - LUENTA - PULU - LEHTI; PULUN UUSI RYTMI ATEENASSA;
PULUN EUROOPPA ERA 1/2 + KOROSTUS; KOHTEET: SAN FRANCISCO JA ISTANBUL,
VAIN EUROOPPA TYON ALLA; IHMISEN MATKA ON YKSI KAARI → KERTOMUS
SOLJUVAKSI → ALKAA MUSTASTA RUUDUSTA → KAARI HYVAKSYTTY, TUTKIMUSVAIHE,
VIISI NAPPIA; LINSSIEN AIDOT AANIMAISEMAT; PAPERIN REUNA (kaksi
merkintää); ALOITUSVALINTA; RANTAVIIVAT; PALLON SULAVUUS; VIAT v1670,
v1671, v1672; TERMINAALI MACILLE). Työskentelet itsenäisesti omistajan
ohjeilla; kysymykset AskUserQuestion-kortteina; ajat Suomen aikaa
(UTC+3); promptit koodilohkoina. Postikierros-rutiini: edellisen session
rutiini on poistettu — luo uusi (tunneittain; fetch claude/postilaatikko,
lue posti/kuvatoimitus.md kärjestä, vastaa posti/fable-vanha.md:n
kärkeen, poimi valmiit agenttityöt ja julkaise, ei salaisuuksia eikä
sähköpostia). Lupasäännöt: .claude/settings.json sallii nyt git, node,
python3, tools-skriptit ja curl ilman luokitinta. Mac-runner: Aja komento
Macilla -työnkulku (aja-macilla.yml) ajaa yksittäisen komennon omistajan
Macilla; pitkät renderöinnit muilla Mac-työnkuluilla.

## 1. Tila

- **main = v1672** (PR #2143) tai uudempi — tarkista `git log origin/main`.
  Illan julkaisut: v1669 etusivupallo Macilta + Addis Abeba/Guatemala +
  Mac-korjaus; v1670 Fes, Dakar, Lagos, Sansibar + Aja komento Macilla +
  lupasäännöt; v1671 pulun Ateena-rytmi, kuplat ja chat, avauksen ääni,
  merkit lukossa, valikon sulku, 72 kuvaa; v1672 pulun uusi kulku 18
  Euroopan kaupungissa äänineen ja kartan korostuksella, aloitusvalinta
  paikallaan 14 kohteella (LA → San Francisco, Istanbul), pallon
  koordinaatit (93 kaupunkia rantaviivalle), kaupunkipiste ruutuvakio,
  nostolaput väistävät nimeä, rantaviivat pehmeät, kehystahti tasainen,
  terminaali soi, kuplapino kurkistaa, pergamentin reuna, Ihmisen matkan
  avausteksti + kuva, loppulappu rullautuu ja sulku ylänurkkaan, 60 kuvaa.
- **Pulun Eurooppa**: 18 kaupunkia valmiina ja generoituna (Dr. Von,
  85 repliikkiä); omistaja käy kuuntelemassa ja antaa palautteen;
  korostus (js/liviapuhe.js LIVIAN_KOROSTUS_KAYTOSSA) kytketään pois
  palautteen jälkeen. Seuraavat Euroopan kaupungit: Lontoo, Pariisi,
  Berliini, Amsterdam, Kööpenhamina, Tukholma, Oslo, Bergen, Dublin,
  Edinburgh, sitten Lissabon, Madrid, Barcelona, Sevilla, Granada,
  Marseille, Rooma, Firenze, Venetsia, Dubrovnik (nykyiset tekstit
  js/packs/fokusvirta-<id>.js pollo.maadoitus/teksti; ehdotukset samalla
  kaavalla: alustus 1 kupla ennen luentaa, huudahdus luennan kohtaan,
  kommentti 1–2 kuplaa; ei kuvaviittauksia; omistaja hyväksyy ennen
  generointia; generointi generoi-pulu.yml, ääni yjJ45q8TVCrtMhEKurxY,
  pakota kyllä; tiivisteet LIVIAN_AANITETYT-tauluun manifestista).
- **Ihmisen matka**: kertomus kaanonissa js/linssit/ihmisen-matka-
  kertomus.js (21 jaksoa + pulun välihuomiot + KEKSINNOT_PULUN_HUOMIOT).
  Toteutus (esitys pimeästä alusta, tutkimusvaihe viidellä napilla,
  äänimaisemat) on joko v1673:ssa tai poimittavana — ks. kohta 2.
  Kertojan äänet generoidaan generoi-linssiluennat.yml:llä
  (`--linssi ihmisen-matka --kertomus`, kun työkalu tukee) ja pulun
  välihuomiot generoi-pulu.yml:llä; Freesound-äänimaisemat aanihaku.yml
  tilalla ihmisen-matka-maisemat (omistaja hyväksyy ehdokaslistan
  docs/raportit/ihmisen-matka-aanimaisemat-ehdokkaat.md).
- **Toinen sessio** (claude/lehdet-2026-09-07-ilta) tekee kaupunkilehtiä
  (Nuuk, Anchorage, Salta, Antofagasta tehty; 9 pienen maan karttanostot;
  MOZ maalehti; lisää pareja jonossa). Poimi haara erissä ja julkaise;
  raportti docs/raportit/lehdet-2026-09-07-ilta.md kertoo kuvatilaukset.

## 2. Poimittavaa (worktreet katoavat resetissä)

Jos jokin näistä EI ole mainissa, se on aloitettava alusta (ohjeet
Raamatussa): paperin vaakareunojen rauhoitus (PAPERIN REUNA 2), roikkuva
kosketus pallolla (VIKA v1671 zoom yhdellä sormella), Ihmisen matkan
esitys yhtenä kaarena, tutkimusvaihe + viisi nappia, viat v1672 (noston
teksti klikattavaksi, äänimaisema irti musiikista, nappulan jalka
pisteessä), kuvaerät 19g/19h, sessio 2:n lehdet.

## 3. Seuraavat tehtävät

1. Pulun Euroopan seuraava erä (yllä) ja Keksintölinssin pulun
   välihuomiot (tekstit kaanonissa, toteutus samalla mekanismilla kuin
   Ihmisen matkan välihuomiot).
2. Ihmisen matkan viimeistely: kertojan äänet, pulun välihuomiot,
   äänimaisemat, omistajan katselmus; sitten sama dramaturgia
   Keksintölinssiin.
3. Kuvaputki: kytke toimitukset (posti/kuvatoimitus.md), kuittaa
   peliversiot; sansa-kuva sds-musiikki-3 odottaa.
4. Aarretehtävien lajit ideoidaan omistajan kanssa MYÖHEMMIN (Raamattu
   KAUPUNGIN KULKU) — ei ennen kuin Euroopan pulutekstit ovat valmiit.
5. Odottaa omistajaa: V3 (vektoriviivan leveys), Lontoon kohtaaminen
   (Mina & Theo vs Leila), VUT tervehdyksen lähde, Ihmisen matkan
   tasapelit (lopun keskipiste, 6 vai 7 kuvaa).

## 4. Pysyvät säännöt (lyhyesti)

Ei dist/-committeja; ei salaisuuksia eikä omistajan sähköpostia repoon,
lokeihin tai User-Agentiin; kuvat vain PD/CC Commonsista tai kuvaputkelta,
kuvatekstit sanasta sanaan, tekoälyn keksimiä kasvoja todellisista
henkilöistä ei oteta; kaikki liike animoidaan pehmeästi; omistajan
linjaukset Raamattuun hänen sanoillaan; fablemaxia vain tarpeeseen,
toteutus Opus-agenteilla (worktree, yksi commit, ei pushia, cherry-pick;
lisäyskonfliktit python3 tools/parvi/liita-lisays.py <tiedosto> <sha>^
<sha>; enintään ~8 agenttia rinnakkain, testit heilahtavat kuormassa —
aja yksin uudestaan); julkaisukaava docs/roolitus.md (uusi-versio.mjs →
testit → tarkista-* → build-standalone → PR → tools/parvi/tarkista-ci.sh →
squash merge expectedHeadSha:lla → haara nollataan mainiin). Pitkät ajot
Macilla kaikilla ytimillä; PR-testit ja iOS pysyvät Actionsissa.
