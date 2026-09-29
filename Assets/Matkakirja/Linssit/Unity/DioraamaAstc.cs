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
        public static Texture2D Lue(byte[] t, string nimi, TextureWrapMode kaari = TextureWrapMode.Clamp)
        {
            if (t == null || t.Length < 32 || t[0] != 0x13 || t[1] != 0xab || t[2] != 0xa1 || t[3] != 0x5c) return null;
            int bx = t[4], by = t[5];
            int w = t[7] | t[8] << 8 | t[9] << 16, h = t[10] | t[11] << 8 | t[12] << 16;
            TextureFormat muoto;
            if (bx == 4 && by == 4) muoto = TextureFormat.ASTC_4x4;
            else if (bx == 6 && by == 6) muoto = TextureFormat.ASTC_6x6;
            else if (bx == 8 && by == 8) muoto = TextureFormat.ASTC_8x8;
            else return null;
            if (!SystemInfo.SupportsTextureFormat(muoto) || w <= 0 || h <= 0) return null;
            int tasoja = 0; long tavuja = 0;
            for (int x = w, y = h; ; x = Math.Max(1, x / 2), y = Math.Max(1, y / 2))
            {
                tavuja += (long)((x + bx - 1) / bx) * ((y + by - 1) / by) * 16; tasoja++;
                if (x == 1 && y == 1) break;
            }
            if (t.Length - 16 != tavuja) return null;
            var raaka = new byte[tavuja];
            Buffer.BlockCopy(t, 16, raaka, 0, (int)tavuja);
            var kuva = new Texture2D(w, h, muoto, tasoja, false)
            { name = nimi, filterMode = FilterMode.Trilinear, wrapMode = kaari, anisoLevel = 4 };
            kuva.LoadRawTextureData(raaka);
            kuva.Apply(false, true);
            return kuva;
        }
    }
}
