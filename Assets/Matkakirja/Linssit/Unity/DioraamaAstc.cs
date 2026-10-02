// ASTC-MIPKETJU (.astcm) Unityn tekstuuriksi (Olavinlinna, Siirtoseppä 29.9.2026). Tiedoston tuottaa
// proto-3d/tyokalut/astc-mip.swift (macOS ImageIO): 16 tavun ASTC-otsake tason 0 mitoilla + kaikkien mip-tasojen
// lohkodata peräkkäin 1×1:een asti (Unityn raakajärjestys). ImageIO kirjoittaa rivit alhaalta ylös kuten Unity
// olettaa, joten kuva on samoin päin kuin LoadImage-JPEG. Tuetut lohkot 4×4, 6×6 ja 8×8. Palauttaa null, jos laite
// ei tue ASTC:tä tai tiedosto on rikki — kutsuja käyttää silloin JPEG:iä.
using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Experimental.Rendering;

namespace Matkakirja.Natiivi
{
    public static class DioraamaAstc
    {
        public static Texture2D Lue(byte[] t, string nimi, TextureWrapMode kaari = TextureWrapMode.Clamp) => Lue(t, nimi, out _, kaari);

        /// <summary>Kuten yllä; syy kertoo lokiin, miksi ASTC:tä ei käytetty (laite ei tue / otsake / koko).</summary>
        /// <param name="ohita">Ylimpiä mip-tasoja ohitetaan (ensilataus v2, 1.10.: puhelimessa kuoren 8k-atlas → 4k samoilla UV:illä,
        /// neljännes GPU-latauksesta ja muistista).</param>
        /// <param name="lineaarinen">Normaalikartat (ei sRGB-muunnosta).</param>
        public static Texture2D Lue(byte[] t, string nimi, out string syy, TextureWrapMode kaari = TextureWrapMode.Clamp, int ohita = 0, bool lineaarinen = false)
        {
            if (t == null) { syy = "otsake"; return null; }
            return Luo(t, t.Length, nimi, out syy, kaari, ohita, lineaarinen, (kuva, siirto, tavuja) =>
            {
                // Suoraan ladatusta puskurista otsakkeen jälkeen (8k-atlas 89 Mt: erillinen kopio tuplasi huippumuistin).
                var kahva = System.Runtime.InteropServices.GCHandle.Alloc(t, System.Runtime.InteropServices.GCHandleType.Pinned);
                try { kuva.LoadRawTextureData(kahva.AddrOfPinnedObject() + (int)siirto, tavuja); }
                finally { kahva.Free(); }
            });
        }

        /// <summary>Linnan piikit (iPad 2.10.): sama natiivimuistista (DioraamaLevyvalimuisti.HaeNatiivi), ei hallittua
        /// 89 Mt:n taulukkoa → ei roskienkeruun kasvua kesken latauksen. Kutsuja vapauttaa t:n.</summary>
        public static Texture2D Lue(Unity.Collections.NativeArray<byte> t, string nimi, out string syy, TextureWrapMode kaari = TextureWrapMode.Clamp, int ohita = 0, bool lineaarinen = false)
        {
            if (!t.IsCreated || t.Length < 32) { syy = "otsake"; return null; }
            var otsake = new byte[16];
            Unity.Collections.NativeArray<byte>.Copy(t, otsake, 16);
            return Luo(otsake, t.Length, nimi, out syy, kaari, ohita, lineaarinen,
                (kuva, siirto, tavuja) => kuva.LoadRawTextureData(t.GetSubArray((int)siirto, tavuja)));
        }

        // --- KAISTOITTAIN (linnan piikit, iPad 2.10.: 8k-atlaksen 89 Mt:n kertalataus vei renderisäikeeltä 64–85 ms) -----------
        /// <summary>Kehittäjän vertailu ("poikki kaistat 0|1"): null/true = isot (≥ 4096) tekstuurit kaistoina.</summary>
        public static bool? KaistatPakotettu;
        const int KaistaTavuja = 8 << 20, KaistaRaja = 4096;

        /// <summary>Iso ASTC-mipketju GPU:lle kaistoina: kohde luodaan ilman latausta (DontUploadUponCreate) ja täytetään
        /// pienistä väliaikaisista tekstuureista Graphics.CopyTexture-kopioina, enintään ~8 Mt ruudussa. Pienet tekstuurit,
        /// 6×6-lohkot ja laitteet ilman CopyTexturea → Lue kerralla. valmis(kuva, syy). Kutsuja vapauttaa t:n.</summary>
        public static IEnumerator LueKaistoina(Unity.Collections.NativeArray<byte> t, string nimi, TextureWrapMode kaari, int ohita, bool lineaarinen,
            Action<Texture2D, string> valmis)
        {
            string syy = null;
            var otsake = new byte[16];
            if (t.IsCreated && t.Length >= 32) Unity.Collections.NativeArray<byte>.Copy(t, otsake, 16);
            bool kaistat = KaistatPakotettu ?? true;
            if (!kaistat || !t.IsCreated || t.Length < 32 || !Mitat(otsake, t.Length, ohita, out var d, out syy)
                || d.W < KaistaRaja || d.Bx != d.By || d.W % d.Bx != 0 || d.H % d.By != 0
                || (SystemInfo.copyTextureSupport & UnityEngine.Rendering.CopyTextureSupport.Basic) == 0)
            {
                valmis(syy == null ? Lue(t, nimi, out syy, kaari, ohita, lineaarinen) : null, syy);
                yield break;
            }
            var gf = GraphicsFormatUtility.GetGraphicsFormat(d.Muoto, !lineaarinen);
            var kuva = new Texture2D(d.W, d.H, gf, d.Tasoja,
                TextureCreationFlags.MipChain | TextureCreationFlags.DontInitializePixels | TextureCreationFlags.DontUploadUponCreate)
            { name = nimi, filterMode = FilterMode.Trilinear, wrapMode = kaari, anisoLevel = 4 };
            long o = 16 + d.Siirto;
            int ruudussa = 0;
            for (int m = 0; m < d.Tasoja; m++)
            {
                int mw = Math.Max(1, d.W >> m), mh = Math.Max(1, d.H >> m);
                int lw = (mw + d.Bx - 1) / d.Bx, lh = (mh + d.By - 1) / d.By;
                long rivi = (long)lw * 16;
                // Kokonaiset lohkorivit kaistaan; pienet tasot (alle lohkon tai kaistan) yhtenä kokonaisen tason kopiona.
                int kaistaRiveja = mw % d.Bx == 0 && mh % d.By == 0 ? (int)Math.Max(1, Math.Min(lh, KaistaTavuja / rivi)) : lh;
                for (int r0 = 0; r0 < lh; r0 += kaistaRiveja)
                {
                    int rivit = Math.Min(kaistaRiveja, lh - r0);
                    bool koko = rivit == lh;
                    int kh = koko ? mh : rivit * d.By;
                    var kaista = new Texture2D(mw, kh, gf, 1, TextureCreationFlags.DontInitializePixels) { name = nimi + ":kaista" };
                    kaista.LoadRawTextureData(t.GetSubArray((int)(o + r0 * rivi), (int)(rivit * rivi)));
                    kaista.Apply(false, true);
                    if (koko) Graphics.CopyTexture(kaista, 0, 0, kuva, 0, m);
                    else Graphics.CopyTexture(kaista, 0, 0, 0, 0, mw, kh, kuva, 0, m, 0, r0 * d.By);
                    UnityEngine.Object.Destroy(kaista);
                    DioraamaRuutu.Ladattu();
                    if (m == 0 || koko) DioraamaRuutu.Tapahtuma($"kaista {nimi} m{m} y{r0 * d.By}");
                    ruudussa += (int)(rivit * rivi);
                    if (ruudussa >= KaistaTavuja) { ruudussa = 0; yield return null; }
                }
                o += rivi * lh;
            }
            DioraamaRuutu.Tapahtuma($"kaistat valmiit {nimi}");
            valmis(kuva, null);
        }

        struct Tiedot { public TextureFormat Muoto; public int Bx, By, W, H, Tasoja; public long Siirto, Tavuja; }

        static bool Mitat(byte[] t, long pituus, int ohita, out Tiedot d, out string syy)
        {
            d = default; syy = null;
            if (pituus < 32 || t[0] != 0x13 || t[1] != 0xab || t[2] != 0xa1 || t[3] != 0x5c) { syy = "otsake"; return false; }
            d.Bx = t[4]; d.By = t[5];
            d.W = t[7] | t[8] << 8 | t[9] << 16; d.H = t[10] | t[11] << 8 | t[12] << 16;
            if (d.Bx == 4 && d.By == 4) d.Muoto = TextureFormat.ASTC_4x4;
            else if (d.Bx == 6 && d.By == 6) d.Muoto = TextureFormat.ASTC_6x6;
            else if (d.Bx == 8 && d.By == 8) d.Muoto = TextureFormat.ASTC_8x8;
            else { syy = $"lohko {d.Bx}×{d.By}"; return false; }
            if (d.W <= 0 || d.H <= 0) { syy = "mitat"; return false; }
            if (!SystemInfo.SupportsTextureFormat(d.Muoto)) { syy = $"laite ei tue {d.Muoto} ({SystemInfo.graphicsDeviceName})"; return false; }
            for (int x = d.W, y = d.H; ; x = Math.Max(1, x / 2), y = Math.Max(1, y / 2))
            {
                d.Tavuja += (long)((x + d.Bx - 1) / d.Bx) * ((y + d.By - 1) / d.By) * 16; d.Tasoja++;
                if (x == 1 && y == 1) break;
            }
            if (pituus - 16 != d.Tavuja) { syy = $"koko {pituus - 16} ≠ {d.Tavuja}"; return false; }
            for (ohita = Math.Min(ohita, d.Tasoja - 1); ohita > 0 && d.W > 1024; ohita--)
            {
                long taso = (long)((d.W + d.Bx - 1) / d.Bx) * ((d.H + d.By - 1) / d.By) * 16;
                d.Siirto += taso; d.Tavuja -= taso; d.Tasoja--;
                d.W = Math.Max(1, d.W / 2); d.H = Math.Max(1, d.H / 2);
            }
            return true;
        }

        static Texture2D Luo(byte[] t, long pituus, string nimi, out string syy, TextureWrapMode kaari, int ohita, bool lineaarinen,
            Action<Texture2D, long, int> lataa)
        {
            if (!Mitat(t, pituus, ohita, out var d, out syy)) return null;
            var kuva = new Texture2D(d.W, d.H, d.Muoto, d.Tasoja, lineaarinen)
            { name = nimi, filterMode = FilterMode.Trilinear, wrapMode = kaari, anisoLevel = 4 };
            lataa(kuva, 16 + d.Siirto, (int)d.Tavuja);
            kuva.Apply(false, true);
            return kuva;
        }
    }
}
