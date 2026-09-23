using System; using CesiumForUnity; using UnityEngine;
namespace Matkakirja {
  public class KarttaKerrokset : MonoBehaviour {
    public static KarttaKerrokset Instanssi;
    public event Action<string> KerrosValmis, KerrosEpaonnistui;
    public void Nakyvyys(string kerros, bool n) {}
    public string LisaaRasteri(string avain, string url, CesiumUrlTemplateRasterOverlayProjection p, int min, int max, float alfa) => avain;
    public void PoistaRasteri(string avain) {}
    public void Alfa(string avain, float a) {}
  }
}
