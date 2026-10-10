// KUVANOSTON ASETTELU (omistaja TF 168, 9.10.2026: "Kuvat jotka näkyvät välillä voisivat tulla pienempinä ruudun reunalle ja jäädä
// vähän pidemmäksi aikaa. Ne voisi olla klikattavissa suuremmaksi, vähän nykykokoa isommiksi"; Päätoimittaja: NOSTOKORTTI-kehys).
// Pallokierroksen yksityiskohtakuva pienenä oikeaan reunaan ylänappien alle (ei metrolinjan vasemmalle eikä Kysy-rivin alas) ja
// napautuksesta suurena keskelle: hieman nykyistä 3D-korttia (KorttiAsettelu.LeveysOsuus 0,4) suurempi, korkeus rajattuna.
// Koordinaatit UI-pisteinä, origo vasemmassa yläkulmassa (UI Toolkit). Puhdas ydin.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public static class KuvanostoAsettelu
    {
        /// <summary>Pieni: leveys osuutena lyhyemmästä sivusta, rajat pt; oikea reuna ja yläraja (ylänappirivin alle).</summary>
        public const float PieniOsuus = 0.26f, PieniMin = 96f, PieniMax = 200f, Reuna = 12f, YlaRaja = 64f;
        /// <summary>Iso: leveys osuutena ruudun leveydestä (nykyinen kortti 0,4) ja korkeusraja vaaka / pysty.</summary>
        public const float IsoOsuus = 0.46f, IsoKorkVaaka = 0.76f, IsoKorkPysty = 0.6f;
        /// <summary>Kuvasuhteen (leveys / korkeus) rajat: hyvin kapea tai leveä kuva rajataan kehykseen.</summary>
        public const float SuhdeMin = 0.6f, SuhdeMax = 1.6f;

        public struct Laatikko
        {
            public float X, Y, Lev, Kork;
            public Laatikko(float x, float y, float lev, float kork) { X = x; Y = y; Lev = lev; Kork = kork; }
            public float Ala => Lev * Kork;
            public override string ToString() => $"[{X:0},{Y:0} {Lev:0}×{Kork:0}]";
        }

        static float Suhde(float suhde) => float.IsNaN(suhde) || suhde <= 0 ? 0.8f : Math.Max(SuhdeMin, Math.Min(SuhdeMax, suhde));

        /// <summary>Pieni kuva oikeaan reunaan ylänappien alle (turvaYla = turva-alueen yläreuna, turvaOikea = oikea).</summary>
        public static Laatikko Pieni(float w, float h, float suhde, float turvaYla = 0f, float turvaOikea = 0f)
        {
            float s = Suhde(suhde);
            float lev = Math.Max(PieniMin, Math.Min(PieniMax, PieniOsuus * Math.Min(w, h)));
            float kork = lev / s;
            float maxKork = Math.Max(48f, (h - turvaYla - YlaRaja) * 0.42f);
            if (kork > maxKork) { kork = maxKork; lev = kork * s; }
            return new Laatikko(w - turvaOikea - Reuna - lev, turvaYla + YlaRaja, lev, kork);
        }

        /// <summary>
        /// KERTOMUSKUVA LISÄKUVIEN VIEREEN (omistaja 10.10.2026 19.0x Pariisin kierroksesta: "kertomuksen aikana ilmestyvät kuvat voisi
        /// tulla yhtä pienellä kuin lisäkuvat näkyvät oikeassa alareunassa … lisäkuvien viereen vasemmalle puolelle"): pieni kuva
        /// lisäkuvien napin korkuisena (koko, pt) ja kuvasuhteen levyisenä (SuhdeMin–SuhdeMax) napin vasemmalle puolelle raon päähän,
        /// alareunat samassa linjassa. oikea = napin oikea reuna ruudun oikeasta reunasta, ala = napin alareuna ruudun alareunasta.
        /// vieressa = false: nappi ei näy, joten kuva tulee sen paikalle.
        /// </summary>
        public static Laatikko Kulmaan(float w, float h, float suhde, float koko, float oikea, float ala, float rako, bool vieressa = true)
        {
            float kork = Math.Max(1f, koko), lev = kork * Suhde(suhde);
            float x = w - oikea - lev - (vieressa ? koko + rako : 0f);
            return new Laatikko(x, h - ala - kork, lev, kork);
        }

        /// <summary>Iso kuva keskelle (kuvateksti alle: kaista pt), hieman nykyistä korttia suurempi, korkeus rajattuna.</summary>
        public static Laatikko Iso(float w, float h, float suhde, float kaista = 0f)
        {
            float s = Suhde(suhde);
            float lev = IsoOsuus * w;
            float maxKork = (w > h ? IsoKorkVaaka : IsoKorkPysty) * h - kaista;
            float kork = lev / s;
            if (kork > maxKork) { kork = maxKork; lev = kork * s; }
            return new Laatikko((w - lev) / 2f, (h - kork - kaista) / 2f, lev, kork);
        }
    }
}
