import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '../../../core/config/supabase.config';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      SUPABASE_CONFIG.URL,
      SUPABASE_CONFIG.ANON_KEY
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(
      this.supabase.auth.signInWithPassword({ email, password })
    ).pipe(
      map(response => {
        if (response.data.user) {
          this.currentUserSubject.next(response.data.user);
          localStorage.setItem('supabaseSession', JSON.stringify(response.data.session));
        }
        return response;
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  // Changed method name from signup to register
  register(email: string, password: string): Observable<any> {
    return from(
      this.supabase.auth.signUp({ email, password })
    ).pipe(
      catchError(error => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  logout(): Observable<any> {
    return from(this.supabase.auth.signOut()).pipe(
      map(() => {
        this.currentUserSubject.next(null);
        localStorage.removeItem('supabaseSession');
        return true;
      }),
      catchError(error => {
        console.error('Logout error:', error);
        throw error;
      })
    );
  }

  getCurrentUser(): Observable<any> {
    return from(this.supabase.auth.getUser()).pipe(
      map(response => response.data.user),
      catchError(error => {
        console.error('Get user error:', error);
        throw error;
      })
    );
  }
}