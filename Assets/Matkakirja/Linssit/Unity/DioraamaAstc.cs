// ASTC-MIPKETJU (.astcm) Unityn tekstuuriksi (Olavinlinna, Siirtoseppä 29.9.2026). Tiedoston tuottaa
// proto-3d/tyokalut/astc-mip.swift (macOS ImageIO): 16 tavun ASTC-otsake tason 0 mitoilla + kaikkien mip-tasojen
// lohkodata peräkkäin 1×1:een asti (Unityn raakajärjestys). ImageIO kirjoittaa rivit alhaalta ylös kuten Unity
// olettaa, joten kuva on samoin päin kuin LoadImage-JPEG. Tuetut lohkot 4×4, 6×6 ja 8×8. Palauttaa null, jos laite
// ei tue ASTC:tä tai tiedosto on rikki — kutsuja käyttää silloin JPEG:iä.
using System;
using UnityEngine;

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

        static Texture2D Luo(byte[] t, long pituus, string nimi, out string syy, TextureWrapMode kaari, int ohita, bool lineaarinen,
            Action<Texture2D, long, int> lataa)
        {
            syy = null;
            if (pituus < 32 || t[0] != 0x13 || t[1] != 0xab || t[2] != 0xa1 || t[3] != 0x5c) { syy = "otsake"; return null; }
            int bx = t[4], by = t[5];
            int w = t[7] | t[8] << 8 | t[9] << 16, h = t[10] | t[11] << 8 | t[12] << 16;
            TextureFormat muoto;
            if (bx == 4 && by == 4) muoto = TextureFormat.ASTC_4x4;
            else if (bx == 6 && by == 6) muoto = TextureFormat.ASTC_6x6;
            else if (bx == 8 && by == 8) muoto = TextureFormat.ASTC_8x8;
            else { syy = $"lohko {bx}×{by}"; return null; }
            if (w <= 0 || h <= 0) { syy = "mitat"; return null; }
            if (!SystemInfo.SupportsTextureFormat(muoto)) { syy = $"laite ei tue {muoto} ({SystemInfo.graphicsDeviceName})"; return null; }
            int tasoja = 0; long tavuja = 0;
            for (int x = w, y = h; ; x = Math.Max(1, x / 2), y = Math.Max(1, y / 2))
            {
                tavuja += (long)((x + bx - 1) / bx) * ((y + by - 1) / by) * 16; tasoja++;
                if (x == 1 && y == 1) break;
            }
            if (pituus - 16 != tavuja) { syy = $"koko {pituus - 16} ≠ {tavuja}"; return null; }
            long siirto = 0;
            for (ohita = Math.Min(ohita, tasoja - 1); ohita > 0 && w > 1024; ohita--)
            {
                long taso = (long)((w + bx - 1) / bx) * ((h + by - 1) / by) * 16;
                siirto += taso; tavuja -= taso; tasoja--;
                w = Math.Max(1, w / 2); h = Math.Max(1, h / 2);
            }
            var kuva = new Texture2D(w, h, muoto, tasoja, lineaarinen)
            { name = nimi, filterMode = FilterMode.Trilinear, wrapMode = kaari, anisoLevel = 4 };
            lataa(kuva, 16 + siirto, (int)tavuja);
            kuva.Apply(false, true);
            return kuva;
        }
    }
}
