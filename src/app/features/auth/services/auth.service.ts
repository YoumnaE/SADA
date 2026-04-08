import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '../../../core/config/supabase.config';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

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

  register(
    email: string,
    password: string,
    name: string
  ): Observable<any> {
    return from(
      this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: { parent_name: name }
        }
      })
    ).pipe(
      switchMap(response => {
        if (response.error) {
          throw response.error;
        }
        const user = response.data.user;
        if (!user) {
          throw new Error('Sign-up succeeded but no user was returned.');
        }
        return from(
          this.supabase.from('parent').insert({
            id: user.id,
            parent_name: name,
            email: user.email
          })
        ).pipe(
          map(parentResponse => {
            if (parentResponse.error) {
              throw new Error(`Failed to save user profile: ${parentResponse.error.message}`);
            }
            return response;
          })
        );
      }),
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