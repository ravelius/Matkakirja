// KUUNNELMAN TEKSTITYS (Natiivi-UI 30.9.2026, Päätoimittaja: Olavinlinna ykkösprioriteetti): huoneeseen tultaessa tilan
// kuunnelma (tila.kuunnelma[], KuunnelmaToisto) etenee rivi kerrallaan. Omistaja 2.10.2026 17.4x (loki d6b00328f): erillinen
// nimipalkki pois; DioraamaTaulu näyttää puhujan (Nimi) kortin kapiteelina otsikon yläpuolella ja repliikin (Teksti) samassa
// kortissa, kun sitä ei puhuta ääneen. Kortin napautus ohittaa rivin; infotaulun "Kuuntele"-nappi aloittaa alusta.
// ÄÄNIKOUKUT (Siirtoseppä kytkee, DioraamaAanet.SoitaKertaAanin): Soita(aani-id) rivin alkaessa ja AanenKesto(aani-id)
// ajoitukseen; ilman niitä kesto tulee tekstistä (14 merkkiä/s + 0,6 s).
using System;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class KuunnelmaKaistale
    {
        /// <summary>Rivin äänen kesto sekunteina aani-id:llä (null = ei ääntä). Siirtoseppä kytkee.</summary>
        public static Func<string, float?> AanenKesto;
        /// <summary>Soittaa rivin äänen aani-id:llä rivin alkaessa. Siirtoseppä kytkee.</summary>
        public static Action<string> Soita;

        /// <summary>Hahmon id → näytettävä nimi (kohtaukset v2: vuorojen puhujat ovat hahmo-id:itä). DioraamaTaulu kytkee.</summary>
        public static Func<string, string> PuhujanNimi;
        /// <summary>Nyt puhuva hahmo (vuoron tai rivin puhuja, ei Pulu eikä kertoja), tai null. DioraamaSovitin vaihtaa sen
        /// hahmolle puhe-silmukan (puhujittaiset aikaleimat ohjaavat puhuvaa hahmoa).</summary>
        public static string PuhuvaHahmo { get; private set; }

        KuunnelmaToisto toisto;
        string tilaId;
        int naytetty = -2;
        KuunnelmaVuoro naytettyVuoro;

        /// <summary>Tilan id, jonka kuunnelma on kesken tai käyty (sama tila ei ala uudelleen ilman Kuuntele-nappia).</summary>
        public string TilaId => tilaId;
        public bool Kaynnissa => toisto != null && toisto.Kaynnissa;
        /// <summary>Pulu napautuksesta (DioraamaSovitin asettaa): kuunnelman Pulu-rivit pois.</summary>
        public static bool IlmanPulua;
        /// <summary>Soiko jokin kuunnelma juuri nyt (Pulun napautusvuoro odottaa keskustelun loppuun).</summary>
        public static bool SoiNyt;
        public string Tila => toisto == null ? "ei kuunnelmaa"
            : $"tila {tilaId}, rivi {toisto.Indeksi + 1}/{toisto.Maara}" + (toisto.Rivi != null ? $" ({toisto.Rivi.Nimi}: {toisto.Rivi.Teksti})" : " (loppu)");

        /// <summary>Nykyisen rivin puhuja versaalein (huomautus perässä) tai null, kun riviä ei ole.</summary>
        public string Nimi { get; private set; }
        /// <summary>Nykyisen rivin teksti, jos sitä ei puhuta ääneen (ääni tai Kertoja pois); muuten null.</summary>
        public string Teksti { get; private set; }

        public bool OhitaRivi()
        {
            if (toisto == null || !toisto.Ohita(Time.unscaledTimeAsDouble)) return false;
            Nayta();
            return true;
        }

        /// <summary>Aloittaa tilan kuunnelman (DioraamaTaulu, kun tila on perillä). alusta = Kuuntele-nappi.</summary>
        public void Aloita(Tila tila, bool alusta = false)
        {
            if (tila == null || tila.Kuunnelma == null || tila.Kuunnelma.Count == 0) { Lopeta(); return; }
            if (!alusta && tilaId == tila.Id) return;
            tilaId = tila.Id;
            // Omistajan linnapalaute 5.10. klo 12.4x: Pulu ei puhu keskustelun väliin (kuunnelman Pulu-rivit pois, Pulu vain
            // napautuksesta) ja rivien väliin luonteva tauko.
            bool ilmanPulua = IlmanPulua;
            var rivit = ilmanPulua ? tila.Kuunnelma.FindAll(r => !r.Pulu) : tila.Kuunnelma;
            toisto = new KuunnelmaToisto(rivit,
                r => AanenKesto != null && !string.IsNullOrEmpty(r.Aani) ? AanenKesto(r.Aani) : null,
                ilmanPulua ? PoikkileikkausLinssi.VuoroTauko : KuunnelmaToisto.Tauko);
            toisto.Aloita(Time.unscaledTimeAsDouble);
            naytetty = -2;
            Nayta();
        }

        /// <summary>Tilasta poistuttiin: rivi pois ja tila unohtuu (seuraava käynti aloittaa alusta).</summary>
        public void Lopeta()
        {
            toisto = null;
            tilaId = null;
            SoiNyt = false;
            PuhuvaHahmo = null; naytettyVuoro = null;
            naytetty = -2;
            Nimi = null; Teksti = null;
        }

        /// <summary>Joka ruutu (DioraamaTaulu.PaivitaInfotaulu): ajastus.</summary>
        public void Paivita()
        {
            if (toisto != null && toisto.Paivita(Time.unscaledTimeAsDouble)) Nayta();
            SoiNyt = Kaynnissa;
            // Kohtaukset v2: keskustelurivin vuoro vaihtuu kesken rivin (yksi äänitiedosto, puhujittaiset aikaleimat).
            var r = toisto?.Rivi;
            if (r != null && r.Vuorot.Count > 0)
            {
                var v = toisto.Vuoro(Time.unscaledTimeAsDouble);
                if (v != naytettyVuoro) { naytettyVuoro = v; NaytaVuoro(r, v); }
            }
            else PuhuvaHahmo = r != null && !r.Pulu && r.Puhuja != "kertoja" ? r.Puhuja : null;
        }

        void Nayta()
        {
            if (toisto == null || naytetty == toisto.Indeksi) return;
            naytetty = toisto.Indeksi;
            var r = toisto.Rivi;
            if (r == null) { Nimi = null; Teksti = null; return; }
            string n = (r.Nimi ?? (r.Pulu ? "Pulu" : r.Puhuja ?? "")).ToUpperInvariant();
            Nimi = string.IsNullOrEmpty(r.Huom) ? n : n + " · " + r.Huom;
            // Omistaja 2.10. 14.1x (loki 14.09): ääneen puhuttua riviä ei näytetä tekstinä; puhujan nimi jää.
            bool aaneen = !string.IsNullOrEmpty(r.Aani) && DioraamaAanet.Puhutaan(r.Aani);
            Teksti = aaneen || string.IsNullOrEmpty(r.Teksti) ? null : r.Teksti;
            if (!string.IsNullOrEmpty(r.Aani)) Soita?.Invoke(r.Aani);
            naytettyVuoro = null;
            if (r.Vuorot.Count > 0) NaytaVuoro(r, toisto.Vuoro(Time.unscaledTimeAsDouble));
        }

        /// <summary>Vuoron puhuja nimeksi ja teksti, jos sitä ei puhuta ääneen (sama sääntö kuin riveillä).</summary>
        void NaytaVuoro(KuunnelmaRivi r, KuunnelmaVuoro v)
        {
            PuhuvaHahmo = v?.Puhuja;
            if (v == null) return;
            Nimi = (PuhujanNimi?.Invoke(v.Puhuja) ?? v.Puhuja ?? "").ToUpperInvariant();
            bool aaneen = !string.IsNullOrEmpty(r.Aani) && DioraamaAanet.Puhutaan(r.Aani);
            Teksti = aaneen || string.IsNullOrEmpty(v.Teksti) ? null : v.Teksti;
        }
    }
}
