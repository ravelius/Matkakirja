// KUUNNELMAN TEKSTITYS (Natiivi-UI 30.9.2026, Päätoimittaja: Olavinlinna ykkösprioriteetti): huoneeseen tultaessa tilan
// kuunnelma (tila.kuunnelma[], KuunnelmaToisto) etenee rivi kerrallaan tekstityskaistaleena infotaulun yläpuolella:
// puhujan nimi pienin kapitein (versaalit, pieni koko, harvennus) ja huomautus ("oven takaa") kursiivina, sen alla repliikki.
// Pulun rivi omalla tyylillään (liuskeensininen pohja, kursiivi). Napautus ohittaa rivin; DioraamaTaulun infotaulun
// "Kuuntele"-nappi aloittaa alusta. Kaistale ei peitä infotaulua, Pulua eikä kertojan laatikkoa (DioraamaTaulu sijoittaa).
// ÄÄNIKOUKUT (Siirtoseppä kytkee, DioraamaAanet.SoitaKertaAanin): Soita(aani-id) rivin alkaessa ja AanenKesto(aani-id)
// ajoitukseen; ilman niitä kesto tulee tekstistä (14 merkkiä/s + 0,6 s).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class KuunnelmaKaistale
    {
        /// <summary>Rivin äänen kesto sekunteina aani-id:llä (null = ei ääntä). Siirtoseppä kytkee.</summary>
        public static Func<string, float?> AanenKesto;
        /// <summary>Soittaa rivin äänen aani-id:llä rivin alkaessa. Siirtoseppä kytkee.</summary>
        public static Action<string> Soita;

        static readonly Color Pohja = new Color(16f / 255f, 12f / 255f, 8f / 255f, 0.78f);
        static readonly Color PuluPohja = new Color(0.16f, 0.22f, 0.29f, 0.84f);
        static readonly Color Reuna = new Color(217f / 255f, 161f / 255f, 59f / 255f, 0.38f);
        static readonly Color PuluReuna = new Color(0.62f, 0.74f, 0.86f, 0.45f);
        static readonly Color NimiVari = new Color(0.90f, 0.78f, 0.52f);
        static readonly Color PuluNimiVari = new Color(0.72f, 0.84f, 0.95f);
        const int HaivytysMs = 180;

        public readonly VisualElement Juuri;
        readonly Label nimi, teksti;
        KuunnelmaToisto toisto;
        string tilaId;
        int naytetty = -2;

        /// <summary>Tilan id, jonka kuunnelma on kesken tai käyty (sama tila ei ala uudelleen ilman Kuuntele-nappia).</summary>
        public string TilaId => tilaId;
        public bool Kaynnissa => toisto != null && toisto.Kaynnissa;
        public string Tila => toisto == null ? "ei kuunnelmaa"
            : $"tila {tilaId}, rivi {toisto.Indeksi + 1}/{toisto.Maara}" + (toisto.Rivi != null ? $" ({toisto.Rivi.Nimi}: {toisto.Rivi.Teksti})" : " (loppu)");

        public KuunnelmaKaistale(VisualElement isa)
        {
            Juuri = Rakenne.El("mk-kuunnelma", isa, PickingMode.Position);
            var s = Juuri.style;
            s.position = Position.Absolute;
            s.paddingTop = 8; s.paddingBottom = 10; s.paddingLeft = 14; s.paddingRight = 14;
            s.borderTopWidth = 1; s.borderBottomWidth = 1; s.borderLeftWidth = 1; s.borderRightWidth = 1;
            s.borderTopLeftRadius = 6; s.borderTopRightRadius = 6; s.borderBottomLeftRadius = 6; s.borderBottomRightRadius = 6;
            s.transitionProperty = new List<StylePropertyName> { new StylePropertyName("opacity") };
            s.transitionDuration = new List<TimeValue> { new TimeValue(HaivytysMs, TimeUnit.Millisecond) };
            s.opacity = 0f;
            s.display = DisplayStyle.None;

            nimi = Rakenne.Teksti("", "mk-kuunnelma__nimi", Juuri);
            nimi.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(nimi, Kirjasin.Kone);
            nimi.style.fontSize = 11;
            nimi.style.letterSpacing = 1.4f;
            nimi.style.whiteSpace = WhiteSpace.Normal;
            nimi.enableRichText = true;

            teksti = Rakenne.Teksti("", "mk-kuunnelma__teksti", Juuri);
            teksti.pickingMode = PickingMode.Ignore;
            teksti.style.fontSize = 15;
            teksti.style.color = new Color(0.97f, 0.94f, 0.88f);
            teksti.style.whiteSpace = WhiteSpace.Normal;
            teksti.style.marginTop = 3;

            // Napautus ohittaa rivin; ei valu dioraamalle eikä infotaululle.
            Juuri.RegisterCallback<PointerDownEvent>(e =>
            {
                if (toisto != null && toisto.Ohita(Time.unscaledTimeAsDouble)) Nayta();
                e.StopPropagation();
            });
        }

        /// <summary>Testikomento: sama kuin napautus kaistaleeseen.</summary>
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
            toisto = new KuunnelmaToisto(tila.Kuunnelma,
                r => AanenKesto != null && !string.IsNullOrEmpty(r.Aani) ? AanenKesto(r.Aani) : null);
            toisto.Aloita(Time.unscaledTimeAsDouble);
            naytetty = -2;
            Nayta();
        }

        /// <summary>Tilasta poistuttiin: kaistale pois ja tila unohtuu (seuraava käynti aloittaa alusta).</summary>
        public void Lopeta()
        {
            toisto = null;
            tilaId = null;
            naytetty = -2;
            Juuri.style.opacity = 0f;
            Juuri.style.display = DisplayStyle.None;
        }

        /// <summary>Joka ruutu (DioraamaTaulu.Paivita): ajastus ja sijoitus. vasen/leveys/alareuna paneelin pisteinä.</summary>
        public void Paivita(float vasen, float leveys, float alareuna)
        {
            if (toisto == null) return;
            if (toisto.Paivita(Time.unscaledTimeAsDouble)) Nayta();
            Juuri.style.left = vasen;
            Juuri.style.width = leveys;
            float korkeus = float.IsNaN(Juuri.layout.height) || Juuri.layout.height <= 0 ? 64f : Juuri.layout.height;
            Juuri.style.top = Mathf.Max(8f, alareuna - korkeus);
        }

        void Nayta()
        {
            if (toisto == null || naytetty == toisto.Indeksi) return;
            naytetty = toisto.Indeksi;
            var r = toisto.Rivi;
            if (r == null)
            {
                Juuri.style.opacity = 0f;
                Juuri.schedule.Execute(() => { if (toisto != null && !toisto.Kaynnissa) Juuri.style.display = DisplayStyle.None; }).StartingIn(HaivytysMs);
                return;
            }
            var s = Juuri.style;
            s.backgroundColor = r.Pulu ? PuluPohja : Pohja;
            var reuna = r.Pulu ? PuluReuna : Reuna;
            s.borderTopColor = reuna; s.borderBottomColor = reuna; s.borderLeftColor = reuna; s.borderRightColor = reuna;
            string n = (r.Nimi ?? (r.Pulu ? "Pulu" : r.Puhuja ?? "")).ToUpperInvariant();
            nimi.text = string.IsNullOrEmpty(r.Huom) ? n : n + " <i>· " + r.Huom + "</i>";
            nimi.style.color = r.Pulu ? PuluNimiVari : NimiVari;
            teksti.text = r.Teksti ?? "";
            Kirjasimet.Aseta(teksti, r.Pulu ? Kirjasin.LukuKursiivi : Kirjasin.Luku);
            s.display = DisplayStyle.Flex;
            s.opacity = 1f;
            if (!string.IsNullOrEmpty(r.Aani)) Soita?.Invoke(r.Aani);
        }
    }
}
