/*
 * DIORAAMAN HERÄTYS — puhdas logiikka (huoneiden yksityiskohtataso ja
 * hahmojen animaatiotila ajan funktiona, ei DOM:ia, ei THREE:ta).
 *
 * Viitetoteutus (docs/raportit/dioraama-rajapinnat-20260929.md kohta 4);
 * natiivi pari on C#-luokka Heratys
 * (Assets/Matkakirja/Linssit/Ydin/Dioraama/Heratys.cs). Pariteettia
 * vartioidaan testivektorein (tools/dioraama/tee-vektorit.mjs →
 * tests/fixtures/dioraama/vektorit.json).
 *
 * KAIKKI ON AJAN PUHDAS FUNKTIO (ElavaKohtaus-malli, speksin kohta 5):
 * sama (rakennus, aikataulu, t) antaa aina saman tuloksen riippumatta
 * kutsujärjestyksestä — ei sisäistä, kutsujen välistä tilaa. Siksi
 * `edellinenTaso` (ks. aanenVoimakkuus) johdetaan aina aikataulun
 * historiasta, ei säilötä kutsujen välillä.
 *
 * `rak` (Rakennus) oletetaan jo KOOSTETUKSI: rak.tilat sisältää TILAt
 * (kohta 1) JA rak.henkilot on hakemisto henkilo-id → { silmukat }
 * (kuten rakennettu rakennus.json ja C#:n Rakennus.Henkilot, speksin
 * kohdat 3 ja 5) — ei pelkkää raakaa js/dioraama/pankit/henkilot.js-
 * lähdedataa. Testivektoreiden oma pieni rakennus koostaa nämä itse.
 */

function rajaa(x, lo, hi) {
  return Math.min(hi, Math.max(lo, x));
}

function loydaTila(rak, tilaId) {
  return rak.tilat.find((t) => t.id === tilaId) ?? null;
}

/**
 * Tapahtuman tavoitetaso annetulle tilaId:lle (kohta 4):
 * kohde → 2; kohteen naapurit → 1; muut → 0;
 * kohde null → kaikki kohdistettavat 1 (muut, esim. "massa", 0).
 */
function tavoitetaso(rak, tapahtuma, tilaId) {
  if (tapahtuma.kohde === null) {
    const tila = loydaTila(rak, tilaId);
    return tila?.kohdistettava ? 1 : 0;
  }
  if (tapahtuma.kohde === tilaId) return 2;
  const kohdeTila = loydaTila(rak, tapahtuma.kohde);
  if (kohdeTila?.naapurit?.includes(tilaId)) return 1;
  return 0;
}

/**
 * Rakentaa tilaId:n tasomuutosten aikajanan koko aikataulusta.
 * Ensimmäinen tapahtuma (hetki 0, kesto 0) asettaa tason välittömästi.
 * Sen jälkeen: LASKU (tavoite < nykyinen) tapahtuu heti tapahtuman
 * hetkellä; NOUSU (tavoite > nykyinen) hetkellä hetki + 0,6·kesto.
 * Sama tavoite kuin nykyinen taso ei tuota uutta pistettä (alkoi ei
 * nollaudu turhaan). Jokainen piste kantaa myös edeltävän tason
 * (`edellinen`) äänenvoimakkuuden liukua varten; ensimmäisellä
 * pisteellä ei ole edeltäjää, joten edellinen = taso (ei liukua,
 * TULKINTA ks. tests/fixtures/dioraama/vektorit.json "tulkinnat").
 *
 * TULKINTA (aikajanan ylilyönti): pisteet talletetaan aikataulun
 * käsittelyjärjestyksessä; kyselyhetkellä t pätee TAULUKON VIIMEINEN
 * piste jonka aika ≤ t. Tämä on yksinkertaisin selvä tulkinta, kun
 * NOUSUn viive (0,6·kesto) voisi teoriassa ulottua seuraavan
 * tapahtuman ohi — toimitetussa esimerkkiaikataulussa tätä ei esiinny.
 */
function aikajana(rak, aikataulu, tilaId) {
  const pisteet = [];
  let taso = null;
  for (const tapahtuma of aikataulu) {
    const tavoite = tavoitetaso(rak, tapahtuma, tilaId);
    if (taso === null) {
      pisteet.push({ aika: tapahtuma.hetki, taso: tavoite, edellinen: tavoite });
      taso = tavoite;
      continue;
    }
    if (tavoite === taso) continue;
    const aika = tavoite < taso ? tapahtuma.hetki : tapahtuma.hetki + 0.6 * tapahtuma.kesto;
    pisteet.push({ aika, taso: tavoite, edellinen: taso });
    taso = tavoite;
  }
  return pisteet;
}

/** Aikajanan viimeinen piste jonka aika ≤ t (ensimmäinen jos yksikään ei täsmää). */
function nykyinenPiste(pisteet, t) {
  let nykyinen = pisteet[0];
  for (const piste of pisteet) {
    if (piste.aika <= t) nykyinen = piste;
  }
  return nykyinen;
}

/** tilanTaso(rak, aikataulu, tilaId, t) → { taso, alkoi }. */
export function tilanTaso(rak, aikataulu, tilaId, t) {
  const piste = nykyinenPiste(aikajana(rak, aikataulu, tilaId), t);
  return { taso: piste.taso, alkoi: piste.aika };
}

/**
 * LISÄYS SPEKSIN YLI (ei kohdassa 4/5 nimettynä, mutta välttämätön):
 * aanenVoimakkuus(taso, alkoi, edellinenTaso, t) tarvitsee edellinenTaso-
 * arvon, eikä tilanTaso() palauta sitä. Koko järjestelmä on ajan puhdas
 * funktio (ElavaKohtaus-malli) eikä säilö tilaa kutsujen välillä, joten
 * edellinenTaso on johdettava samasta aikajanasta kuin taso/alkoi.
 * tilanTasoJaEdellinen(rak, aikataulu, tilaId, t) → { taso, alkoi, edellinenTaso }
 * on se yhteinen haku; tilanTaso() pysyy speksin mukaisena kapeana
 * kutsuna ja käyttää tätä sisäisesti. C#-puolen on lisättävä vastaava
 * julkinen haku (esim. Heratys.TilanTasoJaEdellinen), koska muuten
 * AanenVoimakkuudelle ei ole tilaton lähde kolmannelle parametrille.
 */
export function tilanTasoJaEdellinen(rak, aikataulu, tilaId, t) {
  const piste = nykyinenPiste(aikajana(rak, aikataulu, tilaId), t);
  return { taso: piste.taso, alkoi: piste.aika, edellinenTaso: piste.edellinen };
}

/**
 * Aikataulun viimeisin kohde hetkellä t (koko aikataulusta, ei
 * tilakohtainen): viimeinen tapahtuma jonka hetki ≤ t. null = paraikaa
 * yleisnäkymässä. TULKINTA: tämä yksi haku ratkaisee "yleisnäkymässä"
 * -ehdon kaikille tiloille ja hahmoille samalla hetkellä yhtenäisesti.
 */
function viimeisinKohde(aikataulu, t) {
  let kohde = aikataulu[0].kohde;
  for (const tapahtuma of aikataulu) {
    if (tapahtuma.hetki <= t) kohde = tapahtuma.kohde;
  }
  return kohde;
}

/** Kokonaislukumodulo joka palauttaa aina ei-negatiivisen tuloksen. */
function mod(n, m) {
  return ((n % m) + m) % m;
}

function ruutuLaskuri(t, herasi, fps, ruudut) {
  return mod(Math.floor((t - herasi) * fps), ruudut);
}

/**
 * hahmonTila(rak, aikataulu, tilaId, hahmoIndeksi, t) → { naky, silmukka, ruutu }.
 *
 * herääminen = tason alkoi + 0,2·hahmoIndeksi (porrastus).
 * - Taso 2 JA t ≥ herääminen → hahmon oma silmukka, oma fps/ruudut.
 * - Taso 0 → 'idle', ruutu pakotetusti 0 (pysähdys, ei animoi).
 * - Muulloin (taso 1, TAI taso 2 ennen yksilöllistä heräämistä) →
 *   'idle', fps/2. TULKINTA: speksi ei sano suoraan mitä taso 2
 *   tekee ennen hahmon omaa heräämishetkeä; yksinkertaisin selvä
 *   valinta on kohdella sitä kuten tasoa 1 (huone on jo kohdistettu,
 *   mutta tämä yksittäinen hahmo ei ole vielä "herännyt").
 * - fps/2:ta EI pyöristetä erikseen (TULKINTA: pidetään liukulukuna,
 *   koska formula lopulta floor:aa vain ruutuindeksin).
 * - Yleisnäkymässä (viimeisin kohde null) fps rajataan 6:een; katto
 *   sovelletaan VIIMEISENÄ, tason oman/idle-fps:n ja mahdollisen
 *   /2-jaon jälkeen (TULKINTA).
 * - Reittihahmo (reitti ≠ null) näkyy vain tasolla 2. TULKINTA: muut
 *   (ei-reittihahmot) ovat näkyviä kaikilla tasoilla, koska speksi
 *   rajaa "näkyy vain tasolla 2" -säännön nimenomaan reittihahmoon.
 * - ruutu = floor((t − herääminen)·fps) mod ruudut, tulos ≥ 0 aina
 *   (mod normalisoitu): herääminen voi olla tulevaisuudessa (porrastus)
 *   jolloin (t − herääminen) on negatiivinen juuri tason vaihtuessa.
 */
export function hahmonTila(rak, aikataulu, tilaId, hahmoIndeksi, t) {
  const tila = loydaTila(rak, tilaId);
  const hahmo = tila.hahmot[hahmoIndeksi];
  const henkilo = rak.henkilot[hahmo.henkilo];
  const { taso, alkoi } = tilanTaso(rak, aikataulu, tilaId, t);
  const herasi = alkoi + 0.2 * hahmoIndeksi;
  const ylanakymassa = viimeisinKohde(aikataulu, t) === null;

  const naky = hahmo.reitti !== null ? taso === 2 : true;

  let silmukka;
  let ruudut;
  let fps;
  let ruutu;
  if (taso === 2 && t >= herasi) {
    silmukka = hahmo.silmukka;
    ({ ruudut, fps } = henkilo.silmukat[silmukka]);
  } else if (taso === 0) {
    silmukka = 'idle';
    ({ ruudut, fps } = henkilo.silmukat.idle);
  } else {
    silmukka = 'idle';
    ({ ruudut, fps } = henkilo.silmukat.idle);
    fps = fps / 2;
  }
  if (ylanakymassa) fps = Math.min(fps, 6);
  ruutu = taso === 0 ? 0 : ruutuLaskuri(t, herasi, fps, ruudut);

  return { naky, silmukka, ruutu };
}

/**
 * aanenVoimakkuus(taso, alkoi, edellinenTaso, t): tavoite taso→arvo on
 * 0 / 0,25 / 1 (tasot 0/1/2). Lineaarinen liuku edellisestä tavoitteesta
 * nykyiseen 1,2 sekunnissa alkaen kohdasta `alkoi`. Jos edellinenTaso
 * === taso (esim. ensimmäinen tapahtuma, TULKINTA ks. aikajana()),
 * ei liukua: arvo on heti tavoitteessaan.
 */
export function aanenVoimakkuus(taso, alkoi, edellinenTaso, t) {
  const tavoiteArvo = (s) => (s === 2 ? 1 : s === 1 ? 0.25 : 0);
  const kohdeArvo = tavoiteArvo(taso);
  const alkuArvo = tavoiteArvo(edellinenTaso);
  if (alkuArvo === kohdeArvo) return kohdeArvo;
  const e = rajaa((t - alkoi) / 1.2, 0, 1);
  return alkuArvo + (kohdeArvo - alkuArvo) * e;
}
