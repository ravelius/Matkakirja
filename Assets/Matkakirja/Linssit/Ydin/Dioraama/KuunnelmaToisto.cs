// KUUNNELMAN TOISTO (Natiivi-UI 30.9.2026, Päätoimittaja: Olavinlinnan huoneiden kuunnelmien tekstitys): puhdas ajastus
// ilman UnityEngineä (UI/Linssit/KuunnelmaKaistale.cs piirtää). Rivi kerrallaan: kesto on äänen kesto + 0,6 s tauko, tai
// ilman ääntä tekstin pituudesta (14 merkkiä/s + 0,6 s, KuunnelmaRivi.TekstinKesto). Napautus ohittaa rivin.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Dioraama
{
    public sealed class KuunnelmaToisto
    {
        /// <summary>Tauko rivien välissä, kun kesto tulee äänestä (sama kuin tekstin kestossa).</summary>
        public const double Tauko = 0.6;

        readonly List<KuunnelmaRivi> rivit;
        readonly Func<KuunnelmaRivi, double?> aanenKesto;
        readonly double tauko;
        int i = -1;
        double alku;

        /// <param name="aanenKesto">Rivin äänen kesto sekunteina tai null (ei ääntä); null-funktio = aina tekstistä.</param>
        /// <param name="tauko">Tauko äänellisten rivien välissä (oletus Tauko; Pulu napautuksesta -tilassa VuoroTauko 0,7 s).</param>
        public KuunnelmaToisto(List<KuunnelmaRivi> rivit, Func<KuunnelmaRivi, double?> aanenKesto = null, double tauko = Tauko)
        {
            this.rivit = rivit ?? new List<KuunnelmaRivi>();
            this.aanenKesto = aanenKesto;
            this.tauko = tauko;
        }

        public int Indeksi => i;
        public int Maara => rivit.Count;
        public bool Kaynnissa => i >= 0 && i < rivit.Count;
        public KuunnelmaRivi Rivi => Kaynnissa ? rivit[i] : null;

        public double Kesto(KuunnelmaRivi r)
        {
            double? a = aanenKesto?.Invoke(r);
            return a.HasValue && a.Value > 0 ? a.Value + tauko : r.TekstinKesto;
        }

        /// <summary>Alusta ajassa t (s). False, jos rivejä ei ole.</summary>
        public bool Aloita(double t)
        {
            if (rivit.Count == 0) return false;
            i = 0;
            alku = t;
            return true;
        }

        /// <summary>Etenee ajan mukaan; true, jos rivi vaihtui (myös loppuun).</summary>
        public bool Paivita(double t)
        {
            bool vaihtui = false;
            while (Kaynnissa && t - alku >= Kesto(rivit[i]))
            {
                alku += Kesto(rivit[i]);
                i++;
                vaihtui = true;
            }
            return vaihtui;
        }

        /// <summary>Napautus: seuraava rivi heti (viimeisen jälkeen loppu). True, jos jotain ohitettiin.</summary>
        public bool Ohita(double t)
        {
            if (!Kaynnissa) return false;
            i++;
            alku = t;
            return true;
        }

        public void Lopeta() => i = rivit.Count;
    }
}
