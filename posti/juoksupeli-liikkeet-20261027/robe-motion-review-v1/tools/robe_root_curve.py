"""External actor path for jump_robe; meters, +Y up, +Z forward, time seconds."""
def jump_robe_root(t):
 t=max(0.,min(.96,float(t)));u=(t-.058)/.04
 phase=t-.22*(t-.058)*(1-u*u)**3 if abs(u)<1 else t
 a=(phase-.14)/.60;y=.5*4*a*(1-a) if 0<a<1 else 0.
 return (0.,y,5*phase)
