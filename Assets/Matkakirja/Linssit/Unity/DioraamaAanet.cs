// DIORAAMAN ÄÄNET (Poikkileikkaus-linssi, Linnanrakentaja erä 2, 29.9.2026): dioraaman omat äänisilmukat
// (Tila.Aanet + "massa"-yleisnäkymämalli, ISilmukka-pooli ILinssiYmparisto.Silmukka:sta), tilan satunnaiset
// kertaäänitehosteet (Tila.Tehosteet) ja käsikirjoituksen puheäänet (repliikit, reaktiot, taulun kohdat)
// kertaluonteisina URL:sta (EsityksenAani-malli: UnityWebRequestMultimedia, compressed=true, ei striimausta —
// klipit ovat lyhyitä). Tavoitetasot ja tehosteajastin tulevat Ytimestä (Matkakirja.Linssit.Dioraama.
// Aanimaisema); tämä tiedosto omistaa Unity-puolen kahvat, AudioSourcen ja verkkolataukset. Katso
// dioraama-aanirajapinta-ehdotus.md ja dioraama-rajapinnat-era2-20260929.md kohta 3 "Äänet".
//
// KYTKIMET: Tehosteet ja silmukat noudattavat Kytkin.Aanimaisema (kuten LinssiTehosteet.Soita ja
// IhmisenMatka2Maisema), puheäänet (repliikki/reaktio/kohta) Kytkin.Kertoja (kuten LinssiUi.cs:n
// EsityksenAani.Mykistetty) — molemmat luetaan suoraan Asetukset.Paalla:lla, samasta paikasta kuin muu
// linssikoodi, eikä mitään jaettua tiedostoa muuteta tätä varten.
//
// ELINKAARI: DioraamaSovitin omistaa tämän PYSYVÄNÄ kenttänä (kuten ladatutPinnat/ladatutLiekkiAtlakset) —
// klippivälimuisti säilyy linssin sulkemisen ja uudelleenavaamisen yli, jottei samoja repliikkejä ladata
// verkosta uudestaan joka avauksella. VAIN istuntokohtainen tila (silmukkakahvat, puhuja-lippu, käynnissä
// olevan askeleen tunniste, Ytimen Aanimaisema-instanssi) nollataan Avaa/Sulje-parissa, ks. Avaa ja Sulje.
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Networking;
// "Nakyma" on kahdessa nimiavaruudessa (Matkakirja.Linssit.Nakyma = pallon lat/lon-asento,
// Matkakirja.Linssit.Dioraama.Nakyma = dioraaman NakymaHetkella-tulos): alias poistaa CS0104-ristiriidan,
// samaan tapaan kuin DioraamaSovitin.cs:n DioraamaNakyma-alias.
using Nakyma = Matkakirja.Linssit.Dioraama.Nakyma;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaAanet
    {
        readonly LinssiOhjain o;
        readonly DioraamaSovitin sovitin;

        Aanimaisema aanimaisema = new Aanimaisema();
        ILinssiYmparisto y;
        Rakennus rakennus;
        AudioSource kertaAaniLahde;
        /// <summary>Puheväylän taso −3 dB (Päätoimittaja 30.9.: puhetiedostot −0,2 dBTP, silmukoiden päällä pelivaraa);
        /// masterissa lisäksi DioraamaLimitteri (−1 dBFS).</summary>
        public const float PuheTaso = 0.708f;

        /// <summary>Tilan silmukat: avain (tilaId, aaniId) — kuten Tila.Aanet-lista, jokainen käyttö oma kahva,
        /// vaikka eri tilat sattuisivat viittaamaan samaan äänitiedostoon (ks. tiedoston alkukommentti).</summary>
        readonly Dictionary<(string Tila, string Aani), ISilmukka> silmukat = new Dictionary<(string, string), ISilmukka>();
        /// <summary>KUOLLUT SILMUKKAKAHVA -korjaus (löydös, katselmointi 29.9.2026): hetki (Paivita-kutsun t), jolloin
        /// tämän parin tavoitetaso ensin putosi ≤0,01:een kahvan ollessa auki. Kun t - tämä ≥ 1,5 s, kahva Lopetetaan
        /// ja poistetaan silmukat-sanakirjasta (pooli vapautuu; seuraava tarve avaa uuden kahvan). Ei sisällä avaimia
        /// joiden kahva ei ole auki tai joiden tavoitetaso on tälläkin hetkellä > 0,01.</summary>
        readonly Dictionary<(string Tila, string Aani), double> hiljaisuusAlkoi = new Dictionary<(string, string), double>();
        /// <summary>Paivita-kutsun uudelleenkäyttämät puskurit (ei uutta listaa/joukkoa joka ruutu): ehdokkaat =
        /// kaikki tila+ääni-parit tavoitetasoineen tältä ruudulta, sallitut = niistä valitut (kynnys+top 6).</summary>
        readonly List<(string Tila, string Aani, double Taso)> ehdokkaat = new List<(string, string, double)>();
        readonly HashSet<(string, string)> sallitut = new HashSet<(string, string)>();
        /// <summary>Kertaääniklipit URL:n mukaan; säilyy sulkemisen yli (ks. luokan alkukommentti).</summary>
        readonly Dictionary<string, AudioClip> klipit = new Dictionary<string, AudioClip>(StringComparer.Ordinal);
        readonly HashSet<string> klipitJonossa = new HashSet<string>(StringComparer.Ordinal);

        string viimeAskelAvain;
        bool puhuu;
        /// <summary>"poikki aanet 0|1" -kehityskytkin (A/B): kaikki tämän tiedoston äänet pois, kun false.</summary>
        public bool Paalla = true;

        public DioraamaAanet(LinssiOhjain o, DioraamaSovitin sovitin)
        {
            this.o = o;
            this.sovitin = sovitin;
        }

        /// <summary>Linssi avautuu: tuore Ydin-tila (ei vanhaa liukua/ajastinta edelliseltä istunnolta), kertaäänen
        /// lähde luodaan kerran (pysyy seuraavillekin avauksille, kuten nayttamo-oliot yleensä eivät — tämä on
        /// kevyt AudioSource, ei tarvitse tuhota välissä).</summary>
        public void Avaa(ILinssiYmparisto ymparisto, Rakennus rak, Transform juuri)
        {
            y = ymparisto;
            rakennus = rak;
            aanimaisema = new Aanimaisema();
            silmukat.Clear();
            hiljaisuusAlkoi.Clear();
            viimeAskelAvain = null;
            puhuu = false;
            if (kertaAaniLahde == null)
            {
                var go = new GameObject("DioraamaKertaaanet");
                go.transform.SetParent(juuri, false);
                kertaAaniLahde = go.AddComponent<AudioSource>();
                kertaAaniLahde.playOnAwake = false;
                kertaAaniLahde.spatialBlend = 0;
            }
            DioraamaLimitteri.Paalle(true);
            if (rakennus?.Taulu?.Kohdat != null)
                foreach (var k in rakennus.Taulu.Kohdat) VarmistaLadattuAaniId(k.Aani);
        }

        /// <summary>Rakennus.json valmistui vasta linssin ollessa auki (DioraamaSovitin.LataaRakennus): sama
        /// esilataus kuin Avaa-metodin lopussa, koska rakennus oli silloin vielä null.</summary>
        public void RakennusValmis(Rakennus rak)
        {
            rakennus = rak;
            if (rakennus?.Taulu?.Kohdat != null)
                foreach (var k in rakennus.Taulu.Kohdat) VarmistaLadattuAaniId(k.Aani);
        }

        /// <summary>Yhden tilan data valmistui (DioraamaSovitin.TaydennaLataamattomat, sama hetki kuin glb/atlas-
        /// lataukset alkavat): esilataa TÄMÄN tilan tehosteet ja puheäänet (repliikit, reaktio, taulun kohdat),
        /// jottei ensimmäinen laukaisu jää soittamatta latauksen kesken ollessa (ks. SoitaKertaAani).</summary>
        public void TilaValmis(Tila tila)
        {
            if (tila == null) return;
            foreach (var jakso in tila.Tehosteet)
                foreach (var id in jakso.AaniIdt) VarmistaLadattuAaniId(id);
            foreach (var h in tila.Hahmot)
            {
                foreach (var r in h.Repliikit) VarmistaLadattuAaniId(r.Aani);
                if (h.Reaktio != null) VarmistaLadattuAaniId(h.Reaktio.Aani);
            }
            if (tila.Taulu?.Kohdat != null) foreach (var k in tila.Taulu.Kohdat) VarmistaLadattuAaniId(k.Aani);
        }

        void VarmistaLadattuAaniId(string aaniId)
        {
            if (string.IsNullOrEmpty(aaniId) || rakennus == null || !rakennus.Aanet.TryGetValue(aaniId, out var aani)) return;
            VarmistaLadattu(sovitin.AaniUrl(aani.Tiedosto));
        }

        /// <summary>Joka kehys (DioraamaSovitin.Paivita): tilan silmukoiden tasot, tehosteajastimet ja käsikirjoituksen
        /// puheaskeleen vaihto. t on SAMA hetki kuin nakyma laskettiin (pysäytettyT tai y.Aika) — kun se on jäädytetty
        /// ("poikki aika"), nakyma pysyy samana kehyksestä toiseen, joten mikään tässä metodissa ei havaitse reunaa
        /// eikä laukea uudelleen: ei tarvita erillistä pysäytys-lippua (ks. Aanimaisema.cs:n TehosteAjastin-kommentti).</summary>
        public void Paivita(Rakennus rak, Nakyma nakyma, double t)
        {
            rakennus = rak;
            bool aanimaisemaPaalla = Paalla && Asetukset.Paalla(Kytkin.Aanimaisema);
            bool kertojaPaalla = Paalla && Asetukset.Paalla(Kytkin.Kertoja);

            // KUOLLUT SILMUKKAKAHVA -korjaus (löydös, katselmointi 29.9.2026): ensin kerätään KAIKKIEN tila+ääni-
            // parien tavoitetasot (ILMAN duckausta -- duckaus ei saa vaikuttaa siihen, pidetäänkö kahva ylipäätään
            // auki, ettei repliikki aiheuta kahvan sulkeutumista/avautumista kesken itsensä), pyytämättä yhtäkään
            // silmukkakahvaa tässä vaiheessa. Tehosteet (kertaäänet) eivät käytä poolia, ne pysyvät samassa kierroksessa.
            ehdokkaat.Clear();
            foreach (var tila in rak.Tilat)
            {
                int taso = nakyma.Tasot != null && nakyma.Tasot.TryGetValue(tila.Id, out var ts) ? ts : 0;
                // SilmukanTavoitetaso on TILALLINEN (liuku/alkoi per tilaId) -- kutsutaan AINA, myös Paalla=false,
                // ettei sen sisäinen liuku jää jälkeen; vain lopputulos (ehdokkaan Taso) nollataan kytkimellä.
                double tavoite = aanimaisema.SilmukanTavoitetaso(tila.Id, taso, nakyma.KohdeTila, t);
                foreach (var ap in tila.Aanet)
                {
                    double pankinVoimakkuus = rak.Aanet.TryGetValue(ap.AaniId, out var aani) ? aani.Voimakkuus : 1;
                    double taso01Raw = aanimaisemaPaalla ? tavoite * ap.Voimakkuus * pankinVoimakkuus : 0;
                    ehdokkaat.Add((tila.Id, ap.AaniId, taso01Raw));
                }
                if (aanimaisemaPaalla)
                    for (int ti = 0; ti < tila.Tehosteet.Count; ti++)
                    {
                        // "soi vain kun tilan taso ≥ 1": ajastinta ei edes tikitetä matalammalla tasolla.
                        if (taso < 1) continue;
                        string aaniId = aanimaisema.TehosteenLaukaisu(tila.Id, ti, tila.Tehosteet[ti], t);
                        if (aaniId != null) SoitaKertaAani(aaniId, (float)tila.Tehosteet[ti].Voimakkuus);
                    }
            }

            // Sallitut: tavoitetaso > 0,01 JA enintään 6 suurinta (pooli on jaettu resurssi). Lajitellaan paikoillaan
            // suurin ensin -- kynnyksen alle jäävät ovat aina lajittelun lopussa, joten break riittää.
            ehdokkaat.Sort((a, b) => b.Taso.CompareTo(a.Taso));
            sallitut.Clear();
            for (int i = 0; i < ehdokkaat.Count && i < 6; i++)
            {
                if (ehdokkaat[i].Taso <= 0.01) break;
                sallitut.Add((ehdokkaat[i].Tila, ehdokkaat[i].Aani));
            }

            double duck = puhuu ? 0.15 : 1.0; // sovittimen oma duckaus repliikin ajaksi (ehdotusdokumentin mukaan)
            foreach (var e in ehdokkaat)
            {
                var avainSilmukka = (e.Tila, e.Aani);
                if (sallitut.Contains(avainSilmukka))
                {
                    hiljaisuusAlkoi.Remove(avainSilmukka);
                    var kahva = HaeTaiLuoSilmukka(e.Tila, e.Aani);
                    if (kahva == null) continue;
                    kahva.Voimakkuus((float)Math.Clamp(e.Taso * duck, 0.0, 1.0), 0.4f);
                }
                else if (silmukat.TryGetValue(avainSilmukka, out var kahva) && kahva != null)
                {
                    kahva.Voimakkuus(0f, 0.4f); // häivytys kesken 1,5 s hiljaisuusikkunan (ei napsahda hiljaiseksi)
                    if (!hiljaisuusAlkoi.TryGetValue(avainSilmukka, out var alkoi)) hiljaisuusAlkoi[avainSilmukka] = t;
                    else if (t - alkoi >= 1.5)
                    {
                        kahva.Lopeta();
                        silmukat.Remove(avainSilmukka);
                        hiljaisuusAlkoi.Remove(avainSilmukka);
                    }
                }
            }

            // DUCKAUS ILMAN ÄÄNTÄ -korjaus (löydös, katselmointi 29.9.2026): puhujaksi merkitään (ja silmukoita
            // duckataan) VAIN kun repliikki OIKEASTI soi -- Kertoja-kytkin päällä JA klippi jo ladattu, ei pelkkä
            // askeleen vaihto. Askel (ei teksti) yksilöi vaihtumisen -- ks. Nakyma.Askel-kommentti.
            string avain = nakyma.Puhuja == null ? null : nakyma.KohdeTila + "|" + nakyma.Askel;
            if (avain != viimeAskelAvain)
            {
                bool uusiAskel = avain != null;
                bool aaniSoi = uusiAskel && kertojaPaalla && AaniOnValmis(nakyma.AskeleenAani);
                if (aaniSoi) SoitaKertaAani(nakyma.AskeleenAani, PuheTaso);
                if (aaniSoi != puhuu) { y?.Repliikki(aaniSoi); puhuu = aaniSoi; }
                viimeAskelAvain = avain;
            }
        }

        /// <summary>Linssi sulkeutuu: kaikki silmukat Lopeta, kertaäänet seis, puhuja pois (task-speksi). Klippi-
        /// välimuisti ja rakennus-viittaus säilyvät (ks. luokan alkukommentti) — seuraava Avaa nollaa loput.</summary>
        public void Sulje()
        {
            foreach (var s in silmukat.Values) s?.Lopeta();
            silmukat.Clear();
            hiljaisuusAlkoi.Clear();
            if (kertaAaniLahde != null) kertaAaniLahde.Stop();
            DioraamaLimitteri.Paalle(false);
            y?.Repliikki(false);
            puhuu = false;
            viimeAskelAvain = null;
            y = null;
        }

        ISilmukka HaeTaiLuoSilmukka(string tilaId, string aaniId)
        {
            var avain = (tilaId, aaniId);
            if (silmukat.TryGetValue(avain, out var s)) return s;
            if (y == null || rakennus == null || !rakennus.Aanet.TryGetValue(aaniId, out var aani)) return null;
            string url = sovitin.AaniUrl(aani.Tiedosto);
            if (url == null) return null;
            var kahva = y.Silmukka(url);
            silmukat[avain] = kahva;
            return kahva;
        }

        /// <summary>Soittaa yhden äänipankin id:n kertaäänenä valmiiksi ladatulta klipiltä (PlayOneShot sallii monta
        /// päällekkäistä soittoa samalta lähteeltä). Jos klippi ei ole vielä valmis, käynnistää latauksen mutta EI
        /// jää odottamaan — tämä laukaisu jää hiljaiseksi (poikkeama raportoitu: ks. TilaValmis/RakennusValmis
        /// esilataavat kaiken tunnetun etukäteen, joten tämä koskee vain harvinaista myöhässä saapunutta dataa).</summary>
        void SoitaKertaAani(string aaniId, float voimakkuus)
        {
            if (string.IsNullOrEmpty(aaniId) || rakennus == null || !rakennus.Aanet.TryGetValue(aaniId, out var aani)) return;
            string url = sovitin.AaniUrl(aani.Tiedosto);
            if (url == null) return;
            if (klipit.TryGetValue(url, out var klippi) && klippi != null) kertaAaniLahde.PlayOneShot(klippi, voimakkuus);
            else VarmistaLadattu(url);
        }

        /// <summary>Onko aaniId:n klippi jo ladattu valmiiksi soitettavaksi (SoitaKertaAani soittaisi sen HETI, ei
        /// jää odottamaan latausta) — käytetään päättämään, soiko puheääni OIKEASTI ennen duckausta/Repliikki-
        /// merkintää (DUCKAUS ILMAN ÄÄNTÄ -löydös, katselmointi 29.9.2026: Kertoja-kytkin pois tai kesken oleva
        /// lataus eivät saa väistää silmukoita/muita äänikanavia turhaan).</summary>
        bool AaniOnValmis(string aaniId)
        {
            if (string.IsNullOrEmpty(aaniId) || rakennus == null || !rakennus.Aanet.TryGetValue(aaniId, out var aani)) return false;
            string url = sovitin.AaniUrl(aani.Tiedosto);
            return url != null && klipit.TryGetValue(url, out var klippi) && klippi != null;
        }

        void VarmistaLadattu(string url)
        {
            if (string.IsNullOrEmpty(url) || klipit.ContainsKey(url) || klipitJonossa.Contains(url)) return;
            klipitJonossa.Add(url);
            o.StartCoroutine(LataaKlippi(url));
        }

        IEnumerator LataaKlippi(string url)
        {
            using var p = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.MPEG);
            var dh = (DownloadHandlerAudioClip)p.downloadHandler;
            dh.streamAudio = false;
            dh.compressed = true; // EsityksenAani-malli: ei pääsäikeen PCM-purkua
            p.timeout = 20;
            yield return p.SendWebRequest();
            klipitJonossa.Remove(url);
            if (p.result != UnityWebRequest.Result.Success) { o.Kirjaa("poikki: ääni " + url + " ei latautunut: " + p.error); yield break; }
            klipit[url] = DownloadHandlerAudioClip.GetContent(p);
        }

        /// <summary>Tila lokiin ("poikki aanet"): ladatut klipit, jonossa olevat, soivat silmukat, puhuja.</summary>
        public string Tilaraportti()
        {
            int soivia = 0;
            foreach (var s in silmukat.Values) if (s != null) soivia++;
            return $"poikki aanet: {(Paalla ? "päällä" : "pois")}, klippejä ladattu {klipit.Count} (jonossa {klipitJonossa.Count}), " +
                   $"silmukoita {silmukat.Count} (kahvoja {soivia}), puhuja {(puhuu ? "kyllä" : "ei")}, " +
                   $"limitteri {(DioraamaLimitteri.Instanssi != null && DioraamaLimitteri.Instanssi.enabled ? "päällä, pienin vahvistus " + DioraamaLimitteri.Instanssi.PieninVahvistusJaNollaa().ToString("0.000") : "pois")}";
        }
    }
}
