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

        /// <summary>Tilan silmukat: avain (tilaId, aaniId) — kuten Tila.Aanet-lista, jokainen käyttö oma kahva,
        /// vaikka eri tilat sattuisivat viittaamaan samaan äänitiedostoon (ks. tiedoston alkukommentti).</summary>
        readonly Dictionary<(string Tila, string Aani), ISilmukka> silmukat = new Dictionary<(string, string), ISilmukka>();
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

            foreach (var tila in rak.Tilat)
            {
                int taso = nakyma.Tasot != null && nakyma.Tasot.TryGetValue(tila.Id, out var ts) ? ts : 0;
                double tavoite = aanimaisema.SilmukanTavoitetaso(tila.Id, taso, nakyma.KohdeTila, t);
                foreach (var ap in tila.Aanet)
                {
                    var kahva = HaeTaiLuoSilmukka(tila.Id, ap.AaniId);
                    if (kahva == null) continue;
                    double pankinVoimakkuus = rak.Aanet.TryGetValue(ap.AaniId, out var aani) ? aani.Voimakkuus : 1;
                    double taso01 = aanimaisemaPaalla ? tavoite * ap.Voimakkuus * pankinVoimakkuus : 0;
                    if (puhuu) taso01 *= 0.15; // sovittimen oma duckaus repliikin ajaksi (ehdotusdokumentin mukaan)
                    kahva.Voimakkuus((float)Math.Clamp(taso01, 0.0, 1.0), 0.4f);
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

            string avain = nakyma.Puhuja == null ? null : nakyma.KohdeTila + "|" + nakyma.Puhuja + "|" + nakyma.Repliikki;
            if (avain != viimeAskelAvain)
            {
                bool uusiPuhe = avain != null;
                if (uusiPuhe && kertojaPaalla) SoitaKertaAani(EtsiAskeleenAani(nakyma, rak), 1f);
                if (uusiPuhe != puhuu) { y?.Repliikki(uusiPuhe); puhuu = uusiPuhe; }
                viimeAskelAvain = avain;
            }
        }

        /// <summary>Linssi sulkeutuu: kaikki silmukat Lopeta, kertaäänet seis, puhuja pois (task-speksi). Klippi-
        /// välimuisti ja rakennus-viittaus säilyvät (ks. luokan alkukommentti) — seuraava Avaa nollaa loput.</summary>
        public void Sulje()
        {
            foreach (var s in silmukat.Values) s?.Lopeta();
            silmukat.Clear();
            if (kertaAaniLahde != null) kertaAaniLahde.Stop();
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

        /// <summary>
        /// Käsikirjoituksen kuluvan puheaskeleen äänen id (Rakennus.Aanet-pankista), Nakyman Puhuja+Repliikki+Kohta-
        /// kentistä päätellen — PoikkileikkausLinssin sisäinen askelindeksi (Ohjaaja.KasikirjoitusTila) ei ole
        /// julkinen, joten tämä on ainoa reitti ulkopuolelta (kirjattu raporttiin). "kohta"- ja "reaktio"-askeleet
        /// raportoivat molemmat puhujaksi "pulu" (PoikkileikkausLinssi.Puhe): Nakyma.Kohta erottaa ne, koska se
        /// osuu kohdat[N].Tekstiin täsmälleen silloin kun kuluva askel ON kyseinen kohta-askel.
        /// </summary>
        static string EtsiAskeleenAani(Nakyma nakyma, Rakennus rak)
        {
            if (nakyma.Puhuja == null) return null;
            var tila = nakyma.KohdeTila == null ? null : rak.Tila(nakyma.KohdeTila);
            var kohdat = tila?.Taulu?.Kohdat ?? rak.Taulu?.Kohdat;
            if (nakyma.Puhuja == "pulu" && kohdat != null && nakyma.Kohta >= 0 && nakyma.Kohta < kohdat.Count
                && kohdat[nakyma.Kohta].Teksti == nakyma.Repliikki)
                return kohdat[nakyma.Kohta].Aani;
            if (tila == null) return null;
            if (nakyma.Puhuja == "pulu")
            {
                foreach (var h in tila.Hahmot) if (h.Reaktio != null && h.Reaktio.Teksti == nakyma.Repliikki) return h.Reaktio.Aani;
                return null;
            }
            foreach (var h in tila.Hahmot) if (h.Id == nakyma.Puhuja) return h.Repliikit.Count > 0 ? h.Repliikit[0].Aani : null;
            return null;
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
                   $"silmukoita {silmukat.Count} (kahvoja {soivia}), puhuja {(puhuu ? "kyllä" : "ei")}";
        }
    }
}
