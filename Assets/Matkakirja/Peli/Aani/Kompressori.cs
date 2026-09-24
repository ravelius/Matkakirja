// ÄÄNIMAISEMAN KOMPRESSORI (B7, spesifikaatio §2.2): webin DynamicsCompressorNode puhtaana C#:na.
//
// Web (js/ambience-stream.js liitaKompressori) reitittää jokaisen maisemasoittimen oman
// DynamicsCompressorNoden kautta ENNEN tasoa: threshold −24 dB, knee 18, ratio 4, attack 10 ms,
// release 350 ms. Natiivissa ei ole AudioMixeriä, joten sama algoritmi ajetaan äänisäikeessä
// (Scripts/Peli/MaisemaKompressori.cs, OnAudioFilterRead).
//
// LÄHDE: Chromium third_party/blink/renderer/platform/audio/dynamics_compressor.cc
// (entinen dynamics_compressor_kernel.cc; main 2026-08-12, commit 2db7ab6d4f18) ja
// audio_utilities.cc (DecibelsToLinear = powf(10, 0,05·dB), LinearToDecibels = 20·log10f).
// Portattu rivi riviltä samoin float/double-valinnoin: staattinen käyrä (KneeCurve, Saturate,
// KAtSlope 15 kierroksen geometrinen puolitus), makeup-gain (1 / Saturate(1, k))^0,6, detektori
// (sat release 2,5 ms), verhokäyrä 32 näytteen lohkoissa (hyökkäys suurimman dB-eron mukaan,
// adaptiivinen vapautus 4. asteen polynomilla vyöhykkeistä 0,09/0,16/0,42/0,98), sin-käyristys
// ja 6 ms:n pre-delay (lookahead: vahvistus lasketaan viivästämättömästä signaalista).
// Tarkistettu Chromium 151:n OfflineAudioContextin ulostuloa vasten (KompressoriTestit).
//
// POIKKEAMAT CHROMIUMISTA (kaikki kuulumattomia):
//   - Kanavamäärä on vapaa (Chromium: aina stereo, mono kahdennetaan). Detektori on linkitetty:
//     suurin itseisarvo kaikista kanavista, kuten Chromiumissa kahdesta. Yli 8 kanavaa tai tuntematon
//     näytetaajuus: vain taso (ei koskaan täyttä voimaa).
//   - 32 näytteen lohkojako jatkuu puskurirajojen yli (Chromium aloittaa lohkon jokaisen
//     128 näytteen render quantumin alusta, mikä on 32:n monikerta, joten tulos on sama);
//     Unityn puskurin koko ei siis vaikuta tulokseen.
//   - Reduction-mittaria (metering_gain_) ei lasketa; Vahvistus kertoo viimeisen kokonaisvahvistuksen.
//   - fdlibm::asinf/powf → MathF.Asin/Pow (ero enintään muutama ulp).
//   - Tason kerroin voidaan antaa samaan kierrokseen (Prosessoi tasoAlku → tasoLoppu, lineaarinen):
//     web-ketju on kompressori → gain, joten taso kerrotaan kompressorin jälkeen.
//
// ÄÄNISÄIE: Prosessoi ei allokoi eikä lukitse. Kaikki puskurit varataan konstruktorissa.
using System;

namespace Matkakirja.Peli
{
    /// <summary>Chromiumin DynamicsCompressor (Web Audio) puhtaana C#:na, lomitetuille float-puskureille.</summary>
    public sealed class Kompressori
    {
        // --- webin maisema-asetukset (ambience-stream.js KOMPRESSORI) ---------------
        public const float MaisemaThresholdDb = -24f, MaisemaKneeDb = 18f, MaisemaRatio = 4f;
        public const float MaisemaAttackS = 0.01f, MaisemaReleaseS = 0.35f;

        // --- webin lukijaäänen asetukset (js/puhe.js kytkeVahvistin: gain → kompressori) ------
        public const float LukijaThresholdDb = -10f, LukijaKneeDb = 18f, LukijaRatio = 4f;
        public const float LukijaAttackS = 0.003f, LukijaReleaseS = 0.25f;

        /// <summary>Kanavia, joille pre-delay-puskuri on varattu (lomitettu kehys).</summary>
        public const int MaksKanavia = 8;

        // --- Chromiumin vakiot ---------------------------------------------------------
        const float PreDelayS = 0.006f;
        const int MaxPreDelayFrames = 1024, MaxPreDelayMask = MaxPreDelayFrames - 1;
        const int DefaultPreDelayFrames = 256;
        const int LohkoFrames = 32; // kNumberOfDivisionFrames
        const float SatReleaseS = 0.0025f;
        const float PiPerKaksi = (float)(Math.PI / 2); // kPiOverTwoFloat

        const float ReleaseZone1 = 0.09f, ReleaseZone2 = 0.16f, ReleaseZone3 = 0.42f, ReleaseZone4 = 0.98f;
        const float ABase = 0.9999999999999998f * ReleaseZone1 + 1.8432219684323923e-16f * ReleaseZone2
                          - 1.9373394351676423e-16f * ReleaseZone3 + 8.824516011816245e-18f * ReleaseZone4;
        const float BBase = -1.5788320352845888f * ReleaseZone1 + 2.3305837032074286f * ReleaseZone2
                          - 0.9141194204840429f * ReleaseZone3 + 0.1623677525612032f * ReleaseZone4;
        const float CBase = 0.5334142869106424f * ReleaseZone1 - 1.272736789213631f * ReleaseZone2
                          + 0.9258856042207512f * ReleaseZone3 - 0.18656310191776226f * ReleaseZone4;
        const float DBase = 0.08783463138207234f * ReleaseZone1 - 0.1694162967925622f * ReleaseZone2
                          + 0.08588057951595272f * ReleaseZone3 - 0.00429891410546283f * ReleaseZone4;
        const float EBase = -0.042416883008123074f * ReleaseZone1 + 0.1115693827987602f * ReleaseZone2
                          - 0.09764676325265872f * ReleaseZone3 + 0.028494263462021576f * ReleaseZone4;

        // --- parametrit ja staattinen käyrä ---------------------------------------------
        public float ThresholdDb { get; }
        public float KneeDb { get; }
        public float Ratio { get; }
        public float AttackS { get; }
        public float ReleaseS { get; }

        readonly float slope, linearThreshold, kneeThreshold, dbKneeThreshold, dbYKneeThreshold, k;
        /// <summary>Chromiumin automaattinen makeup-gain (lineaarinen): (1 / Saturate(1, k))^0,6.</summary>
        public float Makeup { get; }
        /// <summary>Polven eksponentti k (KAtSlope(1 / ratio)).</summary>
        public float K => k;

        // --- näytetaajuudesta riippuvat -------------------------------------------------
        int naytetaajuus;
        float attackFrames, satReleaseFrames, satRate2Db, ra, rb, rc, rd, re;
        int preDelayFrames = DefaultPreDelayFrames;

        // --- tila ---------------------------------------------------------------------
        float detectorAverage, compressorGain, dbMaxAttackDiff;
        readonly float[] viive = new float[MaxPreDelayFrames * MaksKanavia];
        int lukuIndeksi, kirjoitusIndeksi = DefaultPreDelayFrames, kanavat;
        int lohkoaJaljella;
        float lohkoTavoite, lohkoNopeus;

        /// <summary>Viimeisin kokonaisvahvistus (makeup × käyristetty kompressorivahvistus), ilman tasoa.</summary>
        public float Vahvistus { get; private set; } = 1f;
        /// <summary>Pre-delay näytteinä nykyisellä näytetaajuudella (Chromium LatencyTime × sr).</summary>
        public int Viive => preDelayFrames;

        /// <summary>Webin äänimaiseman kompressori (−24 dB, knee 18, ratio 4, 10 ms, 350 ms).</summary>
        public static Kompressori Maisema() =>
            new Kompressori(MaisemaThresholdDb, MaisemaKneeDb, MaisemaRatio, MaisemaAttackS, MaisemaReleaseS);

        /// <summary>Webin lukijaäänen kompressori vahvistimen perässä (−10 dB, knee 18, ratio 4, 3 ms, 250 ms).</summary>
        public static Kompressori Lukija() =>
            new Kompressori(LukijaThresholdDb, LukijaKneeDb, LukijaRatio, LukijaAttackS, LukijaReleaseS);

        public Kompressori(float thresholdDb, float kneeDb, float ratio, float attackS, float releaseS)
        {
            ThresholdDb = thresholdDb; KneeDb = kneeDb; Ratio = ratio; AttackS = attackS; ReleaseS = releaseS;
            // UpdateStaticCurveParameters
            linearThreshold = DbLin(thresholdDb);
            slope = 1f / ratio;
            k = KAtSlope(1f / ratio);
            dbKneeThreshold = thresholdDb + kneeDb;
            kneeThreshold = DbLin(dbKneeThreshold);
            dbYKneeThreshold = LinDb(KneeCurve(kneeThreshold, k));
            Makeup = MathF.Pow(1f / Saturate(1f, k), 0.6f);
            Nollaa();
        }

        /// <summary>Chromium Reset(): detektori 0, kompressori 1, viive tyhjäksi. Ei allokoi.</summary>
        public void Nollaa()
        {
            detectorAverage = 0f;
            compressorGain = 1f;
            dbMaxAttackDiff = -1f;
            Array.Clear(viive, 0, viive.Length);
            lukuIndeksi = 0;
            kirjoitusIndeksi = preDelayFrames;
            lohkoaJaljella = 0;
            Vahvistus = 1f;
        }

        // =====================================================================
        // STAATTINEN KÄYRÄ
        // =====================================================================

        static float DbLin(float db) => MathF.Pow(10f, 0.05f * db);
        static float LinDb(float x) => 20f * MathF.Log10(x);
        static float Aarellinen(float x, float oletus) => float.IsNaN(x) || float.IsInfinity(x) ? oletus : x;
        static float Denormaali(float x) => (x > 0 ? x : -x) < 1.17549435e-38f ? 0f : x;

        float KneeCurve(float x, float kk)
        {
            if (x < linearThreshold) return x;
            return linearThreshold + (1f - (float)Math.Exp(-kk * (x - linearThreshold))) / kk;
        }

        float Saturate(float x, float kk)
        {
            if (x < kneeThreshold) return KneeCurve(x, kk);
            float dbX = LinDb(x);
            float dbY = dbYKneeThreshold + slope * (dbX - dbKneeThreshold);
            return DbLin(dbY);
        }

        float KAtSlope(float desiredSlope)
        {
            float dbX = ThresholdDb + KneeDb;
            float x = DbLin(dbX);
            float x2 = 1f, dbX2 = 0f;
            if (!(x < linearThreshold))
            {
                x2 = (float)(x * 1.001);
                dbX2 = LinDb(x2);
            }
            float minK = 0.1f, maxK = 10000f, kk = 5f, s = 1f;
            for (int i = 0; i < 15; ++i)
            {
                if (!(x < linearThreshold))
                {
                    float dbY = LinDb(KneeCurve(x, kk));
                    float dbY2 = LinDb(KneeCurve(x2, kk));
                    s = (dbY2 - dbY) / (dbX2 - dbX);
                }
                if (s < desiredSlope) maxK = kk; else minK = kk;
                kk = MathF.Sqrt(minK * maxK);
            }
            return kk;
        }

        /// <summary>Staattinen käyrä (Chromium Saturate): tulon itseisarvo → ulostulo ilman makeupia.</summary>
        public float Kayra(float x) => Saturate(x, k);

        /// <summary>Staattinen käyrä desibeleinä makeupin kanssa (tasainen signaali, asettunut tila).</summary>
        public float KayraDb(float tuloDb) => LinDb(Saturate(DbLin(tuloDb), k)) + LinDb(Makeup);

        // =====================================================================
        // PROSESSOINTI
        // =====================================================================

        void AsetaNaytetaajuus(int sr)
        {
            naytetaajuus = sr;
            attackFrames = MathF.Max(0.001f, AttackS) * sr;
            float releaseFrames = sr * ReleaseS;
            satReleaseFrames = SatReleaseS * sr;
            satRate2Db = DbLin(2f / satReleaseFrames) - 1f;
            ra = releaseFrames * ABase; rb = releaseFrames * BBase; rc = releaseFrames * CBase;
            rd = releaseFrames * DBase; re = releaseFrames * EBase;
            // SetPreDelayTime(kPreDelay): unsigned-muunnos katkaisee.
            int f = (int)(PreDelayS * sr);
            if (f > MaxPreDelayFrames - 1) f = MaxPreDelayFrames - 1;
            if (f != preDelayFrames)
            {
                preDelayFrames = f;
                Array.Clear(viive, 0, viive.Length);
                lukuIndeksi = 0;
                kirjoitusIndeksi = f;
            }
        }

        /// <summary>Uuden 32 näytteen lohkon verhokäyrä (Chromium Processin lohkosilmukan alku).</summary>
        void AloitaLohko()
        {
            detectorAverage = Aarellinen(detectorAverage, 1f);
            float desiredGain = detectorAverage;
            float scaledDesired = MathF.Asin(desiredGain) / PiPerKaksi;
            bool releasing = scaledDesired > compressorGain;
            float diff = scaledDesired == 0 ? (releasing ? -1f : 1f) : LinDb(compressorGain / scaledDesired);
            float rate;
            if (releasing)
            {
                dbMaxAttackDiff = -1f;
                diff = Aarellinen(diff, -1f);
                float x = diff < -12f ? -12f : diff > 0f ? 0f : diff;
                x = 0.25f * (x + 12f);
                float x2 = x * x, x3 = x2 * x, x4 = x2 * x2;
                float releaseFrames = ra + rb * x + rc * x2 + rd * x3 + re * x4;
                const float DbSpacing = 5f;
                rate = DbLin(DbSpacing / releaseFrames);
            }
            else
            {
                diff = Aarellinen(diff, 1f);
                if (dbMaxAttackDiff == -1f || dbMaxAttackDiff < diff) dbMaxAttackDiff = diff;
                float eff = MathF.Max(0.5f, dbMaxAttackDiff);
                float x = 0.25f / eff;
                rate = 1f - MathF.Pow(x, 1f / attackFrames);
            }
            lohkoTavoite = scaledDesired;
            lohkoNopeus = rate;
            lohkoaJaljella = LohkoFrames;
        }

        /// <summary>
        /// Kompressoi lomitetun puskurin paikallaan ja kertoo tuloksen tasolla, joka kulkee lineaarisesti
        /// tasoAlku → tasoLoppu puskurin yli (viimeinen kehys = tasoLoppu). Ei allokoi.
        /// </summary>
        public void Prosessoi(float[] data, int kanavia, int naytetaajuus, float tasoAlku = 1f, float tasoLoppu = 1f)
        {
            if (data == null || kanavia <= 0) return;
            int kehyksia = data.Length / kanavia;
            if (kehyksia == 0) return;
            float tasoAskel = (tasoLoppu - tasoAlku) / kehyksia;
            if (kanavia > MaksKanavia || (naytetaajuus <= 0 && this.naytetaajuus <= 0))
            {
                // Ei tuettu kanavamäärä tai näytetaajuus tuntematon: vain taso (ei koskaan täyttä voimaa).
                for (int i = 0; i < kehyksia; i++)
                {
                    float t = tasoAlku + tasoAskel * (i + 1);
                    for (int c = 0; c < kanavia; c++) data[i * kanavia + c] *= t;
                }
                return;
            }
            if (naytetaajuus > 0 && naytetaajuus != this.naytetaajuus) AsetaNaytetaajuus(naytetaajuus);
            if (kanavia != kanavat)
            {
                kanavat = kanavia;
                Array.Clear(viive, 0, viive.Length);
            }

            float det = detectorAverage, gain = compressorGain, total = Vahvistus;
            int luku = lukuIndeksi, kirj = kirjoitusIndeksi;
            float makeup = Makeup, satFrames = satReleaseFrames;
            int n = 0;
            for (int i = 0; i < kehyksia; i++)
            {
                if (lohkoaJaljella == 0)
                {
                    detectorAverage = Denormaali(det);
                    compressorGain = Denormaali(gain);
                    AloitaLohko();
                    det = detectorAverage;
                    gain = compressorGain;
                }
                lohkoaJaljella--;

                // Pre-delay: vahvistus lasketaan viivästämättömästä signaalista.
                float tulo = 0f;
                int kv = kirj * MaksKanavia;
                for (int c = 0; c < kanavia; c++)
                {
                    float s = data[n + c];
                    viive[kv + c] = s;
                    float a = s > 0 ? s : -s;
                    if (tulo < a) tulo = a;
                }

                // Detektori (sat release). Kynnyksen alla vaimennus on tasan 1 → 2 dB:n nopeus valmiina.
                float vaimennus, satRate;
                if (tulo <= 0.0001f || tulo < linearThreshold) { vaimennus = 1f; satRate = satRate2Db; }
                else
                {
                    float muotoiltu = Saturate(tulo, k);
                    vaimennus = muotoiltu / tulo;
                    float dbV = MathF.Max(2f, -LinDb(vaimennus));
                    satRate = dbV == 2f ? satRate2Db : DbLin(dbV / satFrames) - 1f;
                }
                float nopeus = vaimennus > det ? satRate : 1f;
                det += (vaimennus - det) * nopeus;
                det = MathF.Min(1f, det);
                det = Aarellinen(det, 1f);

                // Verhokäyrä kohti lohkon tavoitetta.
                if (lohkoNopeus < 1f) gain += (lohkoTavoite - gain) * lohkoNopeus;
                else { gain *= lohkoNopeus; gain = MathF.Min(1f, gain); }

                float kayristetty = (float)Math.Sin((double)(PiPerKaksi * gain));
                total = makeup * kayristetty;
                float g = total * (tasoAlku + tasoAskel * (i + 1));

                int kl = luku * MaksKanavia;
                for (int c = 0; c < kanavia; c++) data[n + c] = viive[kl + c] * g;

                n += kanavia;
                luku = (luku + 1) & MaxPreDelayMask;
                kirj = (kirj + 1) & MaxPreDelayMask;
            }
            lukuIndeksi = luku;
            kirjoitusIndeksi = kirj;
            detectorAverage = det;
            compressorGain = gain;
            Vahvistus = total;
        }
    }
}
