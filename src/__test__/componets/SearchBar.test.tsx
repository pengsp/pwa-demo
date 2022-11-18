import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../../components/searchBar'



describe('测试搜索框', () => {
  test('获得焦点的时候显示取消按钮', () => {

    render(<SearchBar updateSearchResult={() => { }} setPageState={() => { }} />);
    const inputElement = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    fireEvent.focus(inputElement,);
    expect(screen.getByText(/取消/)).toBeInTheDocument()

  });
});
