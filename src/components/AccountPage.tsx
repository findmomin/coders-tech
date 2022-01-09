import { signOut } from 'firebase/auth';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contexts/User';
import { auth } from '../lib/firebase/firebase';
import { scrollBarStyles } from '../styles/globalStyles';
import { gridCenter } from '../styles/utils';
import ReviewProduct from './ReviewProduct';

const Root = styled.div`
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 20rem;
  height: 20rem;
  display: inline-block;
  padding: 2rem;
  margin: 2rem 0;
  border: 2px solid #ccc;
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
`;

const InfoContainer = styled.div``;

const Name = styled.h1`
  font-size: 3.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Email = styled.p`
  font-size: 1.9rem;
  margin-bottom: 1rem;
`;

const LogoutBtn = styled.button`
  font-size: 1.6rem;
  font-weight: 500;
  padding: 0.5rem 2rem;
  color: #fff;
  background: #ff1e1e;
  border-radius: 20px;
  margin-bottom: 4rem;
`;

const Text = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
  color: #444;
  border-bottom: 4px solid var(--accent-color);
`;

const NoProductsToReview = styled.div`
  height: 40vh;
  ${gridCenter}
  background: rgba(0, 0, 0, 0.08);
  border-radius: 1rem;
`;

const IconContainer = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
`;

const SmileyIcon = styled.svg`
  width: 6rem;
  height: 6rem;
  margin-right: 1rem;
  fill: #666;
`;

const TextSecondary = styled.p`
  font-size: 2.2rem;
`;

const ProductsContainer = styled.div`
  max-width: 70rem;
  max-height: 42rem;
  display: grid;
  gap: 2rem;
  padding: 2rem 5rem;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 1rem;
  overflow-y: scroll;
  ${scrollBarStyles}
`;

const NoUser = styled.div`
  min-height: 80vh;
`;

const CartoonImageContainer = styled.div`
  margin: 2rem 0 10rem 0;
`;

const LoginLink = styled.a`
  font-size: 2rem;
  font-weight: 500;
  color: #fff;
  padding: 1.2rem 4rem;
  background: #000;
  border-radius: 30px;
  transition: background 0.2s;

  &:hover {
    background: #222;
  }
`;

const AccountPage = () => {
  const user = useContext(UserContext);

  return (
    <Root>
      {user ? (
        <>
          {/* Image */}
          <ImageContainer>
            <Image
              src={user.image}
              alt={`image of shopnik user ${user.name}`}
              width={200}
              height={200}
            />
          </ImageContainer>

          <InfoContainer>
            {/* Name */}
            <Name>{user.name}</Name>

            {/* Email */}
            <Email>{user.email}</Email>

            {/* Logout button */}
            <LogoutBtn onClick={() => signOut(auth)}>Log out</LogoutBtn>
          </InfoContainer>

          {/* To be reviewed text */}
          <Text>Products to review</Text>

          {user.toBeReviewed.length ? (
            <ProductsContainer>
              {user.toBeReviewed.map(product => (
                <ReviewProduct product={product} key={product.id} />
              ))}
            </ProductsContainer>
          ) : (
            <NoProductsToReview>
              <IconContainer>
                {/* Icon */}
                <SmileyIcon>
                  <use href="/smiley.svg#icon" />
                </SmileyIcon>

                {/* Text */}
                <TextSecondary>No products to review</TextSecondary>
              </IconContainer>
            </NoProductsToReview>
          )}
        </>
      ) : (
        <NoUser>
          <CartoonImageContainer>
            {/* Image */}
            <Image
              src="/person-holding-phone.jpg"
              alt="A cartoon figure using phone."
              width={500}
              height={375}
            />
          </CartoonImageContainer>

          {/* Login Link */}
          <Link href="/login" passHref>
            <LoginLink>Log in</LoginLink>
          </Link>
        </NoUser>
      )}
    </Root>
  );
};

export default AccountPage;
